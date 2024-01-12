import variables from './variables';
import { useState, useEffect } from 'react';

export default function Dashboard () {

    const [ url, setUrl] = useState(variables.dashboard);

    return (    
        <iframe id='dashboard'
                src={url}></iframe>
    )
    
    
}