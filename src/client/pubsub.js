const events = {};

// subscribe to an event
export const on = (eventName, fn) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
}

// unsubscribe to an event
export const off = (eventName, fn) => {
    _.remove(events[eventName], f => fn === f);
}

// emit an event
export const emit = (eventName, data) => {
    events[eventName] 
        && events[eventName].forEach(fn => {
            fn(data);
        });
}