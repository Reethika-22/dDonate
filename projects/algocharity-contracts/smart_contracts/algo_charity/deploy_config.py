from algopy import ARC4Contract, UInt64, arc4, GlobalState, LocalState, Txn

class DonationContract(ARC4Contract):
    """
    dDonate Smart Contract
    A transparent donation platform built on Algorand using ARC4.
    """

    def __init__(self) -> None:
        # Track total donations
        self.total_donations = GlobalState(UInt64(0))

        # Track total causes
        self.cause_count = GlobalState(UInt64(0))

        # Track donations by each donor
        self.donor_donations = LocalState(UInt64(0))

    # -------------------------------
    # User Methods
    # -------------------------------

    @arc4.abimethod(allow_actions=["OptIn"])
    def opt_in(self) -> None:
        """Opt into the contract to enable donation tracking for sender"""
        self.donor_donations[Txn.sender] = UInt64(0)

    @arc4.abimethod
    def register_cause(self) -> arc4.UInt64:
        """Register a new cause"""
        current = self.cause_count.value or UInt64(0)
        self.cause_count.value = current + UInt64(1)
        return arc4.UInt64(self.cause_count.value)

    @arc4.abimethod
    def donate(self, amount: arc4.UInt64) -> arc4.UInt64:
        """Donate Algos to a cause"""
        assert amount.native > 0, "Donation amount must be greater than zero"
        total = self.total_donations.value or UInt64(0)
        self.total_donations.value = total + amount.native

        prev = self.donor_donations.get(Txn.sender, UInt64(0))
        self.donor_donations[Txn.sender] = prev + amount.native

        return arc4.UInt64(self.total_donations.value)

    # -------------------------------
    # Read-only Queries
    # -------------------------------

    @arc4.abimethod(readonly=True)
    def get_total_donations(self) -> arc4.UInt64:
        """Return total donations"""
        return arc4.UInt64(self.total_donations.value or UInt64(0))

    @arc4.abimethod(readonly=True)
    def get_donor_donations(self) -> arc4.UInt64:
        """Return total donations by the caller"""
        return arc4.UInt64(self.donor_donations.get(Txn.sender, UInt64(0)))
