import { serverRun, PORT } from './routes/usersRoutes';

serverRun.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
