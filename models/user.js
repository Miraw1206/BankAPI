class User {
    constructor(id, cash = 0, credit = 0, isActive = true) {
        this.id = id;
        this.cash = cash;
        this.credit = credit;
        this.isActive = isActive;
    }

    deposit(amount) {
        this.cash += amount;
    }

    updateCredit(credit) {
        if (credit >= 0) {
            this.credit = credit;
        }
    }

    withdraw(amount) {
        const total = this.cash + this.credit;
        if (amount > total) {
            return false;
        }

        if (this.cash >= amount) {
            this.cash -= amount;
        } else {
            const cashWithdraw = this.cash;
            const creditWithdraw = amount - cashWithdraw;
            this.cash = 0;
            this.credit -= cashWithdraw;
        }
        return true;
    }

    transfer(amount, receiver) {
        if (!receiver.isActive) {
            return false;
        }
        const total = this.cash + this.credit;
        if (amount > total) {
            return false;
        }
        if (this.cash >= amount) {
            this.cash -= amount;
            receiver.cash += amount;
        } else {
            const cashTransfer = this.cash;
            const creditTransfer = amount - cashTransfer;
            this.cash = 0;
            this.credit -= creditTransfer;
            receiver.cash += cashTransfer;
            receiver.credit += creditTransfer;
        }
        return true;
    }
}

module.exports = User;
