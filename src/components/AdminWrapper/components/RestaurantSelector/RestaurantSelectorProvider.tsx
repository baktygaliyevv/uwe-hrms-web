import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Restaurant } from "../../../../types/domain"
import { restaurantsGet } from "../../../../api/restaurants/restaurantsGet";
import { Loader } from "../../../Loader/Loader";

export type RestaurantSelectorContextType = {
    restaurants: Restaurant[];
    selected: Restaurant;
    setSelected: (r: Restaurant['id']) => void;
}

const RestaurantSelectorContext = createContext<RestaurantSelectorContextType | undefined>(undefined);

export const useRestaurantSelector = () => {
    const context = useContext(RestaurantSelectorContext);

    if(!context) {
        throw new Error('This hook can only be used inside a RestaurantSelectorProvider');
    }

    return context;
}

export const RestaurantSelectorProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [selected, setSelected] = useState<Restaurant>();

    const context = useMemo(() => ({
        restaurants,
        selected: selected!,
        setSelected: (id: Restaurant['id']) => setSelected(restaurants.find((r) => r.id === id))
    }), [restaurants, selected]);

    useEffect(() => {
        restaurantsGet().then(({ data }) => {
            setRestaurants(data.payload);
            if(data.payload.length) {
                setSelected(data.payload[0]);
            }
        });
    }, []);

    return (
        <RestaurantSelectorContext.Provider value={context}>
            {selected ? children : <Loader />}
        </RestaurantSelectorContext.Provider>
    )
};