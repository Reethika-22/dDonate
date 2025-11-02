from algopy import ARC4Contract, UInt64, arc4, GlobalState, LocalState, Txn, Account


class DonationContract(ARC4Contract):
    """
    dDonate Smart Contract
    A transparent donation platform built on Algorand using ARC4.
    Donors can contribute directly to registered causes,
    and charities can withdraw funds with on-chain transparency.
    """

    def __init__(self) -> None:
        # Total Algos donated across all causes
        self.total_donations = GlobalState(UInt64, key="total_donations", description="Total Algos donated in all causes")

        # Total number of registered causes
        self.cause_count = GlobalState(UInt64, key="cause_count", description="Number of causes registered")

        # Donation amount by each donor (local state)
        self.donor_donations = LocalState(UInt64, key="donor_donations", description="Total donations made by each donor")

        # Cause-specific balances and owners
        self.cause_balance = GlobalState(UInt64, key="cause_balance", description="Balance for the current cause")
        self.cause_owner = GlobalState(Account, key="cause_owner", description="Owner of the cause")

    # -------------------------------
    # User Methods
    # -------------------------------

    @arc4.abimethod(allow_actions=["OptIn"])
    def opt_in(self) -> None:
        """Opt into the contract to enable donation tracking for sender"""
        self.donor_donations[Txn.sender] = UInt64(0)

    @arc4.abimethod
    def register_cause(self, cause_name: arc4.String) -> arc4.UInt64:
        """Register a new cause with a unique ID"""
        count = self.cause_count.get()
        self.cause_count.set(count + UInt64(1))

        cause_id = self.cause_count.get()
        self.cause_owner.set(Txn.sender)
        self.cause_balance.set(UInt64(0))
        return arc4.UInt64(cause_id)

    @arc4.abimethod
    def donate(self, cause_id: arc4.UInt64, amount: arc4.UInt64) -> arc4.UInt64:
        """Donate a specified amount to a cause"""
        assert amount.native > 0, "Donation amount must be greater than zero"
        assert cause_id.native <= self.cause_count.get(), "Invalid cause ID"

        total = self.total_donations.get()
        self.total_donations.set(total + amount.native)

        prev_donated = self.donor_donations[Txn.sender]
        self.donor_donations[Txn.sender] = prev_donated + amount.native

        balance = self.cause_balance.get()
        self.cause_balance.set(balance + amount.native)

        return arc4.UInt64(self.total_donations.get())

    @arc4.abimethod
    def withdraw(self, cause_id: arc4.UInt64, receiver: Account) -> None:
        """Allow the cause owner to withdraw all donations"""
        assert cause_id.native <= self.cause_count.get(), "Invalid cause ID"
        assert Txn.sender == self.cause_owner.get(), "Only the cause owner can withdraw funds"

        amount = self.cause_balance.get()
        assert amount > 0, "No funds available for withdrawal"
        self.cause_balance.set(UInt64(0))
        # TODO: implement inner transaction to actually send funds

    # -------------------------------
    # Read-only Queries
    # -------------------------------

    @arc4.abimethod(readonly=True)
    def get_total_donations(self) -> arc4.UInt64:
        return arc4.UInt64(self.total_donations.get())

    @arc4.abimethod(readonly=True)
    def get_donor_donations(self) -> arc4.UInt64:
        return arc4.UInt64(self.donor_donations[Txn.sender])

    @arc4.abimethod(readonly=True)
    def get_cause_balance(self) -> arc4.UInt64:
        return arc4.UInt64(self.cause_balance.get())

    @arc4.abimethod(readonly=True)
    def get_cause_owner(self) -> arc4.Address:
        return arc4.Address(self.cause_owner.get().bytes)

    @arc4.abimethod(readonly=True)
    def get_cause_count(self) -> arc4.UInt64:
        return arc4.UInt64(self.cause_count.get())

    @arc4.abimethod(readonly=True)
    def get_sender_address(self) -> arc4.Address:
        return arc4.Address(Txn.sender.bytes)
