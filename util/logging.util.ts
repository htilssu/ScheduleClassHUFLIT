export function debug(log: any) {
    if (process.env.NODE_ENV === "development") {
        if (typeof log === "string") {
            console.log("%cDEBUG: %c" + log, "color: #ff7f7f; font-size: 18px;", "color: #ffffff;font-size:16px");
        } else {
            console.log("%cDEBUG: ", "color: #ff7f7f; font-size: 18px;");
            console.log(log);
        }
    }
}

export function info(log: any) {
    if (typeof log === "string") {
        console.log("%cINFO: " + log, "color: #1eeb70;font-size: 18px;");
    } else {
        console.log("%cINFO: ", "color: #1eeb70;font-size: 18px;");
        console.log(log);
    }
}

export function error(log: any) {
    if (typeof log === "string") {
        console.log("%cERROR: " + log, "color: #ff0000;font-size: 18px;");
    } else {
        console.log("%cERROR: ", "color: #ff0000;font-size: 18px;");
        console.log(log);
    }
}