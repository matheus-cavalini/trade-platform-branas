import Order from "../../domain/Order";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class ExecuteOrder {
    constructor(
        readonly orderRepository: OrderRepository
    ) { }

    getHighestBuy(orders: Order[]) {
        const buys = orders.filter((order: Order) => order.side === "buy").sort((a: Order, b: Order) => a.price - b.price);
        return buys[buys.length - 1]
    }

    getLowestSell(orders: Order[]) {
        const sells = orders.filter((order: Order) => order.side === "sell").sort((a: Order, b: Order) => a.price - b.price);
        return sells[0]
    }

    async execute(input: Input): Promise<void> {
        const orders = await this.orderRepository.getOrdersByMarketIdAndStatus(input.marketId, "open")
        const highestBuy = this.getHighestBuy(orders)
        const lowestSell = this.getLowestSell(orders)
        if (highestBuy && lowestSell && highestBuy.price >= lowestSell.price) {
            const fillQuantity = Math.min(highestBuy.quantity, lowestSell.quantity);
            const fillPrice = (highestBuy.timestamp.getTime() > lowestSell.timestamp.getTime()) ? lowestSell.price : highestBuy.price;
            const tradeSide = (highestBuy.timestamp.getTime() > lowestSell.timestamp.getTime()) ? "buy" : "sell";
            highestBuy.fillQuantity = fillQuantity;
            lowestSell.fillQuantity = fillQuantity;
            highestBuy.fillPrice = fillPrice;
            lowestSell.fillPrice = fillPrice;
            if (highestBuy.quantity === highestBuy.fillQuantity) {
                highestBuy.status = "closed";
            }
            if (lowestSell.quantity === lowestSell.fillQuantity) {
                lowestSell.status = "closed";
            }
            await this.orderRepository.updateOrder(highestBuy);
            await this.orderRepository.updateOrder(lowestSell);
        }
    }
}

type Input = {
    marketId: string,
}
