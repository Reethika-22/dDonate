from pyteal import *

def approval_program():
    # Global keys
    admin = Bytes("admin")
    cause_count = Bytes("cause_count")

    # Key builders
    def key(prefix, cid): return Concat(Bytes(prefix), Itob(cid))

    # CREATE APP
    on_create = Seq(
        App.globalPut(admin, Txn.sender()),
        App.globalPut(cause_count, Int(0)),
        Approve()
    )

    # ADMIN CHECK
    is_admin = Txn.sender() == App.globalGet(admin)

    # createCause(name, charityAddr, goal)
    create_cause = Seq(
        Assert(is_admin),
        Assert(Txn.application_args.length() == Int(3)),
        cid := App.globalGet(cause_count),
        App.globalPut(key("cause_name_", cid), Txn.application_args[0]),
        App.globalPut(key("charity_", cid), Txn.application_args[1]),
        App.globalPut(key("goal_", cid), Btoi(Txn.application_args[2])),
        App.globalPut(key("raised_", cid), Int(0)),
        App.globalPut(key("approved_", cid), Int(0)),
        App.globalPut(cause_count, cid + Int(1)),
        Log(Concat(Bytes("CAUSE_CREATED|"), Itob(cid))),
        Approve()
    )

    # approveCause(causeId)
    approve_cause = Seq(
        Assert(is_admin),
        cid := Btoi(Txn.application_args[1]),
        App.globalPut(key("approved_", cid), Int(1)),
        Log(Concat(Bytes("CAUSE_APPROVED|"), Itob(cid))),
        Approve()
    )

    # donate(causeId)
    on_donate = Seq(
        Assert(Global.group_size() == Int(2)),  # Payment + AppCall
        Assert(Gtxn[0].type_enum() == TxnType.Payment),
        Assert(Gtxn[0].receiver() == Global.current_application_address()),
        cid := Btoi(Txn.application_args[1]),
        amt := Gtxn[0].amount(),
        Assert(amt > Int(0)),
        App.globalPut(key("raised_", cid), App.globalGet(key("raised_", cid)) + amt),
        Log(Concat(Bytes("DONATION|"), Itob(cid), Bytes("|"), Gtxn[0].sender(), Bytes("|"), Itob(amt))),
        Approve()
    )

    # withdraw(causeId, amount)
    on_withdraw = Seq(
        Assert(Txn.application_args.length() == Int(3)),
        cid := Btoi(Txn.application_args[1]),
        amt := Btoi(Txn.application_args[2]),
        charity := App.globalGet(key("charity_", cid)),
        Assert(Or(Txn.sender() == charity, is_admin)),
        Assert(Or(
            App.globalGet(key("approved_", cid)) == Int(1),
            App.globalGet(key("raised_", cid)) >= App.globalGet(key("goal_", cid))
        )),
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.receiver: charity,
            TxnField.amount: amt,
            TxnField.fee: Int(0)
        }),
        InnerTxnBuilder.Submit(),
        App.globalPut(key("raised_", cid),
                      App.globalGet(key("raised_", cid)) - amt),
        Log(Concat(Bytes("WITHDRAW|"), Itob(cid), Bytes("|"), Txn.sender(), Bytes("|"), Itob(amt))),
        Approve()
    )

    # ROUTER
    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("createCause"), create_cause],
        [Txn.application_args[0] == Bytes("approveCause"), approve_cause],
        [Txn.application_args[0] == Bytes("donate"), on_donate],
        [Txn.application_args[0] == Bytes("withdraw"), on_withdraw]
    )

    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(is_admin)],
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(is_admin)],
        [Txn.on_completion() == OnComplete.ClearState, Approve()],
    )

    return program


def clear_state_program():
    return Approve()


if __name__ == "__main__":
    from pyteal import compileTeal, Mode
    approval = compileTeal(approval_program(), mode=Mode.Application, version=6)
    clear = compileTeal(clear_state_program(), mode=Mode.Application, version=6)
    with open("approval.teal", "w") as f: f.write(approval)
    with open("clear.teal", "w") as f: f.write(clear)
    print("✅ Generated approval.teal & clear.teal")
