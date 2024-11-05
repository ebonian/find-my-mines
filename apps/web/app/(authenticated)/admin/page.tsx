'use client'

import Layout from "../../_components/common/layout";
import { useEffect, useState } from 'react';
import axios from "../../_lib/axios";
import { useSocket } from "../../_contexts/socket";
import { useGameContext } from "../../_contexts/game";
import { Button } from "../../_components/ui/button";



export default function Page() {
    const { socket, subscribe, unsubscribe, send } = useSocket();
    const { } = useGameContext
    
    const [stats, setStats] = useState({ connectedUsers: [], totalConnections: 0 });
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      subscribe('stats', (newStats) => {
        setStats(newStats);
        setIsLoading(false);
      });
  
      send('/get-stats', {});
  
      const interval = setInterval(() => {
        send('/get-stats', {});
      }, 10000);
  
      return () => {
        unsubscribe('stats');
        clearInterval(interval);
      };
    }, [subscribe, unsubscribe, send]);

    if (isLoading) {
      return (
            <p className="text-center">Loading...</p>
      );
    }

    // to be implement

    return (
            <Layout
            className='flex min-h-screen flex-col items-center py-16'> 

            <div className="text-6xl font-bold">Admin Panel</div>
            <div className="text-6xl">Currently Online: {stats.totalConnections}</div>
            
            <Button size="lg"
            color="purple"
            onClick={ () =>
              console.log("click")
            }
            >
              Reset All Scores
            </Button>

            
            </Layout>
    )
}