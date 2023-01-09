import { useEffect } from 'react';
import { useState } from 'react';
import styles from './UserStatsGraphs.module.css';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

export default function UserStatsGraphs({ data }) {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: +item.acessos,
      };
    });

    setTotal(
      data.map(({ acessos }) => +acessos).reduce((prev, next) => prev + next),
    );
    setGraph(graphData);
    // console.log(data.map(({ acessos }) => +acessos).reduce((prev, next) => prev + next));
    // console.log(data);
  }, [data]);

  return (
    <section className={`${styles.graph} anime-left`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>
          Acessos: <b>{total}</b>
        </p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 100 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem} ${styles.graphBar}`}>
        <VictoryChart>
          <VictoryBar
            alignment="start"
            cornerRadius={5}
            data={graph}
          ></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
}
