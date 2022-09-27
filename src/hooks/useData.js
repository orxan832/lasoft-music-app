import { useCallback, useState } from 'react';

const useData = (incomingData = '') => {

    const [data, setData] = useState(incomingData);

    const dataHandler = useCallback(d => setData(d), []);

    return [data, dataHandler];
};

export default useData;