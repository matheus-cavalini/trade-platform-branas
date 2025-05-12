import pgp from "pg-promise";
import Order from "../../domain/Order";
import DatabaseConnection from "../database/DatabaseConnection";
export default interface OrderRepository {
    saveOrder(order: Order): Promise<void>
    getOrderById(orderId: string): Promise<Order>
}

export class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: DatabaseConnection) { }

    async saveOrder(order: Order) {
        await this.connection.query("insert into ccca.order (order_id, market_id, account_id, side, quantity, price, status, timestamp) values ($1, $2, $3, $4, $5, $6, $7, $8)",
            [order.orderId, order.marketId, order.accountId, order.side, order.quantity, order.price, order.status, order.timestamp])
    }

    async getOrderById(orderId: string): Promise<Order> {
        const [orderData] = await this.connection.query("select * from ccca.order where order_id = $1", [orderId])
        return new Order(orderData.order_id, orderData.market_id, orderData.account_id, orderData.side, orderData.quantity, orderData.price, orderData.status, orderData.timestamp);
    }
}