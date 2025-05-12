import Signup from "./application/usecase/Signup";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import GetAccount from "./application/usecase/GetAccount";
import Withdraw from "./application/usecase/Withdraw";
import Deposit from "./application/usecase/Deposit";
import PlaceOrder from "./application/usecase/PlaceOrder";
import { OrderRepositoryDatabase } from "./infra/repository/OrderRepository";
import GetOrder from "./application/usecase/GetOrder";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import OrderController from "./infra/controller/OrderController";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";

const httpServer = new ExpressAdapter()
const connection = new PgPromiseAdapter()
const accountRepository = new AccountRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const withdraw = new Withdraw(accountRepository)
const deposit = new Deposit(accountRepository)
const placeOrder = new PlaceOrder(orderRepository)
const getOrder = new GetOrder(orderRepository)
AccountController.config(httpServer, signup, getAccount, deposit, withdraw)
OrderController.config(httpServer, placeOrder, getOrder)
httpServer.listen(3000)