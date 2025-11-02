import logging
import algokit_utils

logger = logging.getLogger(__name__)

# Deployment script for dDonate Algorand Smart Contract
def deploy() -> None:
    from smart_contracts.artifacts.donation.donation_contract_client import (
        DonationContractFactory,
        RegisterCauseArgs,
        DonateArgs,
    )

    # Initialize Algorand environment (TestNet or LocalNet)
    algorand = algokit_utils.AlgorandClient.from_environment()
    deployer_ = algorand.account.from_environment("DEPLOYER")

    # Create the smart contract factory instance
    factory = algorand.client.get_typed_app_factory(
        DonationContractFactory, default_sender=deployer_.address
    )

    # Deploy the contract (create if not exists)
    app_client, result = factory.deploy(
        on_update=algokit_utils.OnUpdate.AppendApp,
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
    )

    if result.operation_performed in [
        algokit_utils.OperationPerformed.Create,
        algokit_utils.OperationPerformed.Replace,
    ]:
        # Fund the contract with 1 Algo for initial operations
        algorand.send.payment(
            algokit_utils.PaymentParams(
                amount=algokit_utils.AlgoAmount(algo=1),
                sender=deployer_.address,
                receiver=app_client.app_address,
            )
        )

    # Opt-in to contract for local state tracking (if required by your contract)
    # If your generated client has an opt_in method, use it as below:
    if hasattr(app_client.send, "opt_in"):
        app_client.send.opt_in()
        logger.info(f"Opted into {app_client.app_name} ({app_client.app_id})")

    # Register a sample cause
    cause_name = "Clean Water Fund"
    response = app_client.send.register_cause(args=RegisterCauseArgs(cause_name=cause_name))
    logger.info(
        f"Registered cause on {app_client.app_name} ({app_client.app_id}) "
        f"with name={cause_name}, cause ID: {response.abi_return}"
    )

    # Make a test donation
    donation_amount = 1_000_000  # 1 Algo in microAlgos
    cause_id = 1
    donate_response = app_client.send.donate(args=DonateArgs(cause_id=cause_id, amount=donation_amount))
    logger.info(
        f"Donated {donation_amount / 1_000_000} Algo to cause ID {cause_id}. "
        f"Total donations: {donate_response.abi_return}"
    )

    # Get total donations
    total_response = app_client.send.get_total_donations()
    logger.info(f"Total donations in the system: {total_response.abi_return / 1_000_000} Algo")
