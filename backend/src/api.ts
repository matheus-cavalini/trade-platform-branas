import Signup from "./application/usecase/Signup";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import GetAccount from "./application/usecase/GetAccount";
import Withdraw from "./application/usecase/Withdraw";
import Deposit from "./application/usecase/Deposit";
import PlaceOrder from "./application/usecase/PlaceOrder";
import { OrderRepositoryDatabase } from "./infra/repository/OrderRepository";
import GetOrder from "./application/usecase/GetOrder";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import OrderController from "./infra/controller/OrderController";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import GetDepth from "./application/usecase/GetDepth";
import WebSocket from "ws"
import { Mediator } from "./infra/mediator/Mediator";
import ExecuteOrder from "./application/usecase/ExecuteOrder";
import { WSSAdapter } from "./infra/websocket/WebSocketServer";
import OrderHandler from "./application/handlers/OrderHandler";
import { TradeRepositoryDatabase } from "./infra/repository/TradeRepository";
import TradeController from "./infra/controller/TradeController";
import GetTrades from "./application/usecase/GetTrades";

const httpServer = new ExpressAdapter();
//const httpServer = new HapiAdapter();
const websocketServer = new WSSAdapter(3001)
const connection = new PgPromiseAdapter();
const mediator = new Mediator();
const accountRepository = new AccountRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const tradeRepository = new TradeRepositoryDatabase(connection)
const signup = new Signup(accountRepository);
const getAccount = new GetAccount(accountRepository);
const withdraw = new Withdraw(accountRepository);
const deposit = new Deposit(accountRepository);
const placeOrder = new PlaceOrder(orderRepository, mediator);
const executeOrder = new ExecuteOrder(orderRepository, tradeRepository);
const getOrder = new GetOrder(orderRepository);
const getDepth = new GetDepth(orderRepository);
const getTrades = new GetTrades(tradeRepository);
OrderHandler.config(mediator, websocketServer, executeOrder, getDepth)
AccountController.config(httpServer, signup, getAccount, deposit, withdraw);
OrderController.config(httpServer, placeOrder, getOrder, getDepth);
TradeController.config(httpServer, getTrades);
httpServer.listen(3000);