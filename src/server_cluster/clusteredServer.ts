import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { serverRun, PORT } from '../routes/usersRoutes';

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  const workers = [];
  for (let i = 0; i < cpus().length; i++) {
    const worker = cluster.fork({ PORT: PORT + i });
    workers.push({ number: i, pid: worker.process.pid, port: PORT + i });
  }
  console.log(workers);
  cluster.on("listening", (worker, addr) => {
    console.log(`I am worker ${worker.id} on Port: ${addr.port} `);
  });
  cluster.on("exit", (worker, code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log(`Worker ${worker.id} finished. Exit code: ${code}`);
    }
  });
} else if (cluster.isWorker) {
  serverRun.listen(PORT);
  console.log(`Worker with Pid: ${process.pid} started, port ${PORT}`);
}
