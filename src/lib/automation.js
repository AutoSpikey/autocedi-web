export function constructPayload(
    label,
    triggerField,
    triggerType,
    triggerValue,
    payType,
    payValue,
    payAccountType,
    payAccountInfo,
) {
    const payload = {
        label: label,
        trigger: {
            field: triggerField, type: triggerType, value: triggerValue,
        },
        conditions: [],
        actions: [
            { type: payType, value: payValue, destination: { accountType: payAccountType, accountInfo: payAccountInfo } }
        ]
    }

    console.log(payload)

    return payload;
}