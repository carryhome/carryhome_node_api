import express, { Application, Request, Response, NextFunction} from 'express'
import '../env'
const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
})

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`))