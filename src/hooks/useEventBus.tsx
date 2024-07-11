import { useCallback } from 'react';
import { Subject } from 'rxjs';

type EventBusType = {
    [key: string]: Subject<any>;
};

const eventBus: EventBusType = {};

const getEventBus = (eventName: string): Subject<any> => {
    if (!eventBus[eventName]) {
        eventBus[eventName] = new Subject<any>();
    }
    return eventBus[eventName];
};

const emitEvent = (eventName: string, data: any) => {
    const eventBusInstance = getEventBus(eventName);
    eventBusInstance.next(data);
};

const useEventBus = () => {
    const subscribe = useCallback((eventName: string, callback: (data: any) => void) => {
        const eventBusInstance = getEventBus(eventName);
        const subscription = eventBusInstance.subscribe(callback);

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { emitEvent, subscribe };
};

export default useEventBus;
