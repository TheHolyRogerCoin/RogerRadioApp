const Helpers = {
    getMarketInfos: (marketName) => {
        let pairs = marketName.split("/");
        let baseUnit = pairs[0].toLowerCase();
        let quoteUnit = pairs[1].toLowerCase();
        let marketId = `${baseUnit}${quoteUnit}`;
        return {
            baseUnit,
            quoteUnit,
            marketId,
        }
    },
    getTickers: (markets) => {
        let tickers = {}
        markets.forEach(name => {
            let { baseUnit, quoteUnit, marketId } = Helpers.getMarketInfos(name);
            const change = (10 + Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
            const coeffChange = 1 + parseFloat(change / 1000);
            const open = 0.134 * coeffChange;
            const last = 0.134 / coeffChange;
            const price_change_percent = (last - open) / last * 100;
            const signPrefix = price_change_percent >= 0 ? '+' : '-';

            tickers[marketId] = {
                "name": name,
                "base_unit": baseUnit,
                "quote_unit": quoteUnit,
                "low": `${0.001 * coeffChange}`,
                "high": `${0.145 * coeffChange}`,
                "last": `${last}`,
                "open": open,
                "volume": `${150 * coeffChange}`,
                "sell": "0.0",
                "buy": "0.0",
                "avg_price": "0.0",
                "price_change_percent": `${signPrefix}${Math.abs(price_change_percent.toFixed(2))}%`,
                "at": Date.now() / 1000,
            }
        });
        return tickers;
    },
    getBalances: () => {
      const getBalanceValue = (value, precision) => ((Math.random() > 0.5 ? 1 : -1) * Math.random() / 10 + +value).toFixed(precision);
      const getLockedValue = (value, precision) => (Math.random() / 10 + +value).toFixed(precision);
      const getFeeLockedValue = (value, precision) => (Math.random() / 10 + +value).toFixed(precision);

      return {
        "altm": [getBalanceValue("1000.12", 8), getLockedValue("100.001", 8), getFeeLockedValue("20000.001", 8)],
        "bch": [getBalanceValue("10.12", 8), getLockedValue("0.001", 8)],
        "btc": [getBalanceValue("0.21026373", 8), getLockedValue("0.0001", 8)],
        "dash": [getBalanceValue("5", 6), getLockedValue("0.0005", 6)],
        "eth": [getBalanceValue("5", 6), getLockedValue("0.0002", 6)],
        "usd":  [getBalanceValue("1000", 2), getLockedValue("100", 2)]
      }
    },
    getDepth: (sequence) => {
      const delta = 2 * (1 + Math.cos(2 * Math.PI * Date.now() / 1000 / 3600))
      const fV = (volume) => String(parseFloat(volume) + delta * 10);
      return {
          "asks": [
              ["12.0", fV("1.5")],
              ["12.01", fV("1.5")],
              ["12.03", fV("1.5")],
              ["12.73", fV("1.5")],
              ["13.13", fV("1.5")],
              ["13.43", fV("1.5")],
              ["15.0", fV("1.5")],
              ["20.0", fV("80")],
              ["20.5", fV("10.0")],
              ["25.0", fV("1.0")],
              ["30.0", fV("1.0")],
              ["35.0", fV("1.0")],
              ["45.0", fV("1.0")],
              ["50.0", fV("1.0")],
              ["55.0", fV("1.0")],
              ["60.0", fV("1.0")],
              ["65.0", fV("1.0")],
              ["70.0", fV("1.0")],
              ["75.0", fV("1.0")],
              ["80.0", fV("1.0")],
              ["85.0", fV("1.0")],
              ["90.0", fV("1.0")],
              ["95.0", fV("1.0")],
              ["100095.0", fV("1.0")],
          ],
          "bids": [
              ["10.95", fV("1.5")],
              ["10.90", fV("45")],
              ["10.85", fV("35")],
              ["10.70", fV("10")],
              ["10.50", fV("10")],
              ["10.10", fV("10")],
              ["9.00", fV("10")],
              ["8.50", fV("10")],
              ["8.00", fV("10")],
              ["7.00", fV("10")],
              ["6.50", fV("10")],
              ["6.00", fV("10")],
              ["5.00", fV("10")],
              ["4.00", fV("10")],
              ["3.00", fV("10")],
              ["2.00", fV("10")],
              ["1.00", fV("10")],
          ],
          "sequence": sequence,
      }
    },
    getDepthIncrement: (sequence) => {
      const delta = 2 * (1 + Math.cos(2 * Math.PI * Date.now() / 1000 / 3600))
      const fV = (volume) => String(parseFloat(volume) + delta * 10);

      if (Math.random() < 0.3) {
        if (Math.random() < 0.05) {
          return {
            "asks": ["15.0", "0.0"],
            "sequence": sequence,
          }
        } else {
          return {
            "asks": ["15.0", fV("22.5")],
            "sequence": sequence,
          }
        }
      } else {
        if (Math.random() > 0.95) {
          return {
            "bids": ["9.00", "0.0"],
            "sequence": sequence,
          }
        } else {
          return {
            "bids": ["9.00", fV("22.5")],
            "sequence": sequence,
          }
        }
      }
    },
    getStreamsFromUrl: (url) => url.replace("/", "").split(/[&?]stream=/).filter(stream => stream.length > 0),
    unique: (list) => list.filter((value, index, self) => self.indexOf(value) === index)
}

module.exports = Helpers;
