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
            conditionField, conditionType, conditionValue,
        }
    ]

    payload["pay"] = [
       { type: payType, value: payValue, accountType: payAccountType, accountInfo: payAccountInfo}
    ]

    return payload;
}