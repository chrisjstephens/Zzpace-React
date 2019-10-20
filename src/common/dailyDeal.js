export default function dailyDeal(dailyDealData, discountType, subTotal) {
    // Calculate a discount based on daily deal, and whether end-user is booking a flight/hotel.
    let newTotal;
    let discountAmount = 0;

    if (dailyDealData.type === 'FirstDayOfTheMonth') {
      newTotal = subTotal * dailyDealData.discount;
    } else if (dailyDealData.type === discountType) {
      newTotal = subTotal * dailyDealData.discount;
    } else {
      newTotal = subTotal;
    }

    if (newTotal < subTotal) {
      discountAmount = subTotal - newTotal;
    }

    const discountDataObject = {
      newTotal: newTotal,
      discountAmount: discountAmount
    };

    return discountDataObject;
}
