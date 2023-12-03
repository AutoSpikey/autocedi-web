export function constructPayload({
    label,
    triggerField,
    triggerType,
    triggerAmount,
    triggerCron,
    payField,
    payValue,
    account
}) {
    console.log({
        label,
        triggerField,
        triggerType,
        triggerAmount,
        triggerCron,
        payField,
        payValue,
        account
    })

    const payload = {
        label: label,
        trigger: {
            type: triggerType, field: triggerField, amount: Number(triggerAmount), cron: triggerCron
        },
        conditions: [],
        actions: [
            { field: payField, value: Number(payValue), destination: account }
        ]
    }

    console.log(payload)

    return payload;
}