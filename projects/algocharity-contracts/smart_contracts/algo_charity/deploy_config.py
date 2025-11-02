from algopy import ARC4Contract, UInt64, arc4, GlobalState, LocalState, Txn, Account

class DonationContract(ARC4Contract):
    """
    dDonate Smart Contract
    A transparent donation platform built on Algorand using ARC4.
    Donors can contribute directly to registered causes,
    and charities can withdraw funds with on-chain transparency.
    """

    def _init_(self) -> None:
        # Total Algos donated across all causes
        self.total_donations = GlobalState(UInt64(0), key="total_donations", description="Total Algos donated in all causes")

        # Total number of registered causes
        self.cause_count = GlobalState(UInt64(0), key="cause_count", description="Number of causes registered")

        # Donation amount by each donor (local state)
        self.donor_donations = LocalState(UInt64, key="donor_donations", description="Total donations made by each donor")

        # Mapping of cause IDs to balances (global state)
        self.cause_balances = GlobalState(dict, key="cause_balances", description="Tracks balance per cause ID")

        # Mapping of cause IDs to owners (global state)
        self.cause_owners = GlobalState(dict, key="cause_owners", description="Owner address for each cause ID")

    # -------------------------------
    # User Methods
    # -------------------------------

    @arc4.abimethod(allow_actions=["OptIn"])
    def opt_in(self) -> None:
        """Opt into the contract to enable donation tracking for sender"""
        self.donor_donations[Txn.sender] = UInt64(0)

    @arc4.abimethod
    def register_cause(self, cause_name: arc4.String) -> arc4.UInt64:
        """
        Register a new cause.
        Each cause is assigned a unique ID.
        Only the creator (Txn.sender) becomes the cause owner.
        """
        self.cause_count.value += UInt64(1)
        cause_id = self.cause_count.value
        self.cause_balances[cause_id] = UInt64(0)
        self.cause_owners[cause_id] = Txn.sender
        return arc4.UInt64(cause_id)

    @arc4.abimethod
    def donate(self, cause_id: arc4.UInt64, amount: arc4.UInt64) -> arc4.UInt64:
        """
        Donate a specified amount of Algos to a cause.
        The sender’s total donations and cause balance are both updated.
        """
        assert amount.native > 0, "Donation amount must be greater than zero"
        assert cause_id.native <= self.cause_count.value, "Invalid cause ID"

        # Update total and donor-specific donations
        self.total_donations.value += amount.native
        self.donor_donations[Txn.sender] += amount.native
        self.cause_balances[cause_id.native] += amount.native

        return arc4.UInt64(self.total_donations.value)

    @arc4.abimethod
    def withdraw(self, cause_id: arc4.UInt64, receiver: Account) -> None:
        """
        Allow the cause owner to withdraw all donations for their cause.
        """
        assert cause_id.native <= self.cause_count.value, "Invalid cause ID"
        owner = self.cause_owners[cause_id.native]
        assert Txn.sender == owner, "Only the cause owner can withdraw funds"

        amount = self.cause_balances[cause_id.native]
        assert amount > 0, "No funds available for withdrawal"

        # Simulate fund transfer
        self.cause_balances[cause_id.native] = UInt64(0)
        # In actual implementation, use an inner transaction to send Algos

    # -------------------------------
    # Read-only Queries
    # -------------------------------

    @arc4.abimethod(readonly=True)
    def get_total_donations(self) -> arc4.UInt64:
        """Return total donations across all causes"""
        return arc4.UInt64(self.total_donations.value)

    @arc4.abimethod(readonly=True)
    def get_donor_donations(self) -> arc4.UInt64:
        """Return total donations by the caller"""
        return arc4.UInt64(self.donor_donations[Txn.sender])

    @arc4.abimethod(readonly=True)
    def get_cause_balance(self, cause_id: arc4.UInt64) -> arc4.UInt64:
        """Return the current donation balance for a specific cause"""
        return arc4.UInt64(self.cause_balances[cause_id.native])

    @arc4.abimethod(readonly=True)
    def get_cause_owner(self, cause_id: arc4.UInt64) -> arc4.Address:
        """Return the owner address for a specific cause"""
        return arc4.Address(self.cause_owners[cause_id.native].bytes)

    @arc4.abimethod(readonly=True)
    def get_cause_count(self) -> arc4.UInt64:
        """Return total number of registered causes"""
        return arc4.UInt64(self.cause_count.value)

    @arc4.abimethod(readonly=True)
    def get_sender_address(self) -> arc4.Address:
        """Return the address of the caller"""
        return arc4.Address(Txn.sender.bytes)
