from typing import Tuple, List


def calculate_projections(
        initial: float,
        deposit_amount: float,
        interest_rate: float,
        years: int = 50
) -> Tuple[List[str], List[str]]:
    """
    Calculate year-by-year balances over 'years' years with monthly deposits.

    Arguments:
        initial -- initial savings amount
        deposit_amount -- monthly deposit amount
        interest_rate -- annual interest rate (in percentage)
        years -- number of years to project (default is 50)

    Returns:
        (a tuple of two lists)
        x_axis -- list of years as strings
        y_axis -- list of projected balances at each year as strings   
    """
    monthly_rate = interest_rate / 100.0 / 12.0
    balance = initial

    projections = [round(balance, 2)]  # initial balance at year 0 

    total_months = years * 12
    for month in range(1, total_months + 1):
        # 1. add the deposit 
        balance += deposit_amount
        # 2. apply one month's interest
        balance *= (1 + monthly_rate)

        # 3. each 12 months, save the year-end balance
        if month % 12 == 0:
            projections.append(round(balance, 2))

    x_axis = [str(i) for i in range(0, years + 1)]
    y_axis = [f"{j:.2f}" for j in projections]

    return x_axis, y_axis