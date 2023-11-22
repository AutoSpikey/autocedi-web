export function constructPayload(
    trigger,
    cron,
    receiveType,
    receiveValue,
    conditionField,
    conditionType,
    conditionValue,
    payType,
    payValue,
    payAccountType,
    payAccountInfo,
) {
    const payload = {};

    payload["trigger"] = {
        type: trigger,
    }
    if (trigger === "time") payload.trigger["value"] = { cron }
    else if (trigger === "receive") payload.trigger["value"] = { receiveType, receiveValue }

    payload["conditions"] = [
        {
            field: conditionField, type: conditionType, value: conditionValue,
        }
    ]

    payload["pay"] = [
        { type: payType, value: payValue, destination: { accountType: payAccountType, accountInfo: payAccountInfo } }
    ]

    return payload;
}