#Flask Application app.py

from flask import Flask, render_template, redirect, jsonify
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import os
import psycopg2
from flask_cors import CORS
import scipy.stats as sts
from scipy.stats import linregress
# CORS(app)
engine = create_engine("postgresql://postgres:postgres@localhost/Inflation")
Base = automap_base()
Base.prepare(engine, reflect=True)
Banks_week_month = Base.classes.banks_week_month
Consumer_monthly = Base.classes.consumer_monthly
Consumers_quarterly = Base.classes.consumers_quarterly
Cpi_monthly = Base.classes.cpi_monthly
Dates = Base.classes.dates
Federal_reserve_weekly = Base.classes.federal_reserve_weekly
Foreign_trade_month_quarter = Base.classes.foreign_trade_month_quarter
Gdp_quarterly = Base.classes.gdp_quarterly
Government_quarterly = Base.classes.government_quarterly
Investment_month_quarter = Base.classes.investment_month_quarter
M1m2 = Base.classes.m1m2
Misc_annual = Base.classes.misc_annual
Misc_daily = Base.classes.misc_daily
Ppi_monthly = Base.classes.ppi_monthly
Stocks_gold_daily = Base.classes.stocks_gold_daily
Velocity = Base.classes.velocity

column_table_index = {'m1': 'm1m2', 'm2': 'm1m2', 'non_m1_components_m2': 'm1m2', 'm1v': 'velocity', 'm2v': 'velocity', 'gdp': 'gdp_quarterly', 'nom_gdpcap': 'gdp_quarterly',  'real_gdp': 'gdp_quarterly', 'real_gdpcap': 'gdp_quarterly', 'gdp_deflator': 'gdp_quarterly', 'gnp': 'gdp_quarterly', 'federal_debt': 'government_quarterly', 'debt_pct_gdp': 'government_quarterly', 'government_expenditures': 'government_quarterly', 'federal_surplus_deficit': 'government_quarterly', 'deficit_surplus': 'misc_annual', 'fr_held_debt': 'government_quarterly', 'federal_debt_held_by_public': 'government_quarterly', 'corporate_income_tax_receipts': 'government_quarterly', 'government_transfer_payments': 'government_quarterly', 'fed_funds_rate': 'banks_week_month', 'fed_assets': 'federal_reserve_weekly', 'total_fed_assets': 'federal_reserve_weekly', 'fed_res_held_treasuries': 'federal_reserve_weekly', 'fed_mbs': 'federal_reserve_weekly', 'fed_liabilities_non_reserve_deposits': 'federal_reserve_weekly', 'financial_stress': 'fedderal_rserve_weekly', 'reserve_balances': 'banks_week_month', 'commercial_bank_cash_assets': 'banks_week_month', 'commercial_bank_assets': 'banks_week_month', 'commercial_bank_credit': 'banks_week_month', 'commercial_bank_deposits': 'banks_week_month', 'commercial_industrial_loans': 'banks_week_month', 'consumer_loans_com_banks': 'banks_week_month', '_30yr_fixed_rate_mortgage': 'banks_week_month', 'gold_price': 'stocks_gold_daily', 'silver_price': 'stocks_gold_daily', 'djia_close': 'stocks_gold_daily', 'nasdaq_close': 'stocks_gold_daily', 'sp500_close': 'stocks_gold_daily', 'stock_market_cap': 'misc_annual', 'price_per_barrel': 'misc_daily', 'ppi_all_commodities': 'ppi_monthly', 'ppi_manufacturing': 'ppi_monthly', 'ppi_building_materials': 'ppi_monthly', 'ppi_metals': 'ppi_monthly', 'copper_price': 'ppi_monthly', 'ppi_iron_steel': 'ppi_monthly', 'global_iron_price': 'ppi_monthly', 'ppi_steel_wire': 'ppi_monthly', 'global_aluminum_price': 'ppi_monthly', 'ppi_wood_lumber': 'ppi_monthly', 'ppi_lumber': 'ppi_monthly', 'ppi_wood_pulp': 'ppi_monthly', 'ppi_cement_concrete': 'ppi_monthly', 'ppi_plastics_resins': 'ppi_monthly', 'global_rubber_price': 'ppi_monthly', 'ppi_semiconductors_electronics': 'ppi_monthly', 'global_corn_price': 'ppi_monthly', 'global_wheat_price': 'ppi_monthly', 'ppi_freight': 'ppi_monthly', 'population': 'consumer_monthly', 'economic_uncertainty': 'misc_daily', 'consumer_sentiment': 'consumer_monthly', 'inf_expectation': 'cpi_monthly', 'inf_expectation_fiveyr': 'misc_daily', 'ten_year_breakeven_inflation': 'misc_daily','inflation_consumer_price': 'misc_annual', 'unemployment': 'consumer_monthly', 'job_openings_nonfarm': 'consumer_monthly', 'labor_participation_rate': 'consumer_monthly', 'real_output_hour': 'consumers_quarterly', 'real_median_house_income': 'misc_annual', 'average_hourly_wage': 'consumer_monthly', 'real_disposable_personal_income': 'consumer_monthly', 'wealth_total_top1pct': 'consumers_quarterly', 'wealth_share_top1pct': 'consumers_quarterly', 'bottom_50pct_net_worth': 'consumers_quarterly', 'corporate_profits_after_tax': 'consumers_quarterly', 'debt_as_pct_corporate_equities': 'consumers_quarterly', 'personal_savings': 'consumer_monthly', 'gross_private_saving': 'consumers_quarterly', 'house_debt_gdp_ratio': 'consumers_quarterly', 'household_debt_service_pmtpctgdp': 'consumers_quarterly', 'consumer_loan_delinquency_rate': 'consumers_quarterly', 'creditcard_delinquency_rate': 'consumers_quarterly', 'homeownership_rate': 'consumers_quarterly', 'median_house_sale_price': 'consumers_quarterly', 'real_residential_property_price': 'consumers_quarterly', 'mortgage_delinquency': 'consumers_quarterly', 'rental_vacancy_rate': 'consumers_quarterly', 'pce_index': 'consumer_monthly', 'pce': 'consumer_monthly', 'real_pce': 'consumer_monthly', 'pce_durable_goods': 'consumer_monthly', 'real_pce_durable_goods': 'consumer_monthly', 'pce_nondurable_goods': 'consumer_monthly', 'pce_services': 'consumers_quarterly', 'cpi': 'cpi_monthly', 'cpi_core': 'cpi_monthly', 'cpi_urban': 'cpi_monthly', 'cpi_housing_cities': 'consumer_monthly', 'cpi_primary_rent': 'cpi_monthly', 'cpi_vehicles': 'consumer_monthly', 'cpi_urban_transportation': 'consumer_monthly', 'cpi_medical': 'cpi_monthly', 'cpi_food_bev': 'cpi_monthly', 'cpi_eggs': 'consumer_monthly', 'cpi_apparel_cities': 'consumer_monthly', 'ecommerce_pct_of_totalsales': 'consumers_quarterly', 'net_exports': 'foreign_trade_month_quarter', 'net_exports_pctofgdp': 'foreign_trade_month_quarter', 'net_trade': 'foreign_trade_month_quarter', 'imports_goods_services': 'foreign_trade_month_quarter', 'real_imports': 'foreign_trade_month_quarter', 'all_commodities_import_price_index': 'foreign_trade_month_quarter', 'imports_from_china': 'foreign_trade_month_quarter', 'cpi_india': 'foreign_trade_month_quarter', 'gross_domestic_private_investment': 'investment_month_quarter','real_gross_domestic_private_investment': 'investment_month_quarter', 'construction_spending': 'investment_month_quarter', 'housing_starts': 'investment_month_quarter'}

series_index = {1: 'm1',
 2: 'm2',
 3: 'non_m1_components_m2',
 4: 'm1v',
 5: 'm2v',
 6: 'gdp',
 7: 'nom_gdpcap',
 8: 'real_gdp',
 9: 'real_gdpcap',
 10: 'gdp_deflator',
 11: 'gnp',
 12: 'federal_debt',
 13: 'debt_pct_gdp',
 14: 'government_expenditures',
 15: 'federal_surplus_deficit',
 16: 'deficit_surplus',
 17: 'fr_held_debt',
 18: 'federal_debt_held_by_public',
 19: 'corporate_income_tax_receipts',
 20: 'government_transfer_payments',
 21: 'fed_funds_rate',
 22: 'fed_assets',
 23: 'total_fed_assets',
 24: 'fed_res_held_treasuries',
 25: 'fed_mbs',
 26: 'fed_liabilities_non_reserve_deposits',
 27: 'financial_stress',
 28: 'reserve_balances',
 29: 'commercial_bank_cash_assets',
 30: 'commercial_bank_assets',
 31: 'commercial_bank_credit',
 32: 'commercial_bank_deposits',
 33: 'commercial_industrial_loans',
 34: 'consumer_loans_com_banks',
 35: '_30yr_fixed_rate_mortgage',
 36: 'gold_price',
 37: 'silver_price',
 38: 'djia_close',
 39: 'nasdaq_close',
 40: 'sp500_close',
 41: 'stock_market_cap',
 42: 'price_per_barrel',
 43: 'ppi_all_commodities',
 44: 'ppi_manufacturing',
 45: 'ppi_building_materials',
 46: 'ppi_metals',
 47: 'copper_price',
 48: 'ppi_iron_steel',
 49: 'global_iron_price',
 50: 'ppi_steel_wire',
 51: 'global_aluminum_price',
 52: 'ppi_wood_lumber',
 53: 'ppi_lumber',
 54: 'ppi_wood_pulp',
 55: 'ppi_cement_concrete',
 56: 'ppi_plastics_resins',
 57: 'global_rubber_price',
 58: 'ppi_semiconductors_electronics',
 59: 'global_corn_price',
 60: 'global_wheat_price',
 61: 'ppi_freight',
 62: 'population',
 63: 'economic_uncertainty',
 64: 'consumer_sentiment',
 65: 'inf_expectation',
 66: 'inf_expectation_fiveyr',
 67: 'ten_year_breakeven_inflation',
 68: 'inflation_consumer_price',
 69: 'unemployment',
 70: 'job_openings_nonfarm',
 71: 'labor_participation_rate',
 72: 'real_output_hour',
 73: 'real_median_house_income',
 74: 'average_hourly_wage',
 75: 'real_disposable_personal_income',
 76: 'wealth_total_top1pct',
 77: 'wealth_share_top1pct',
 78: 'bottom_50pct_net_worth',
 79: 'corporate_profits_after_tax',
 80: 'debt_as_pct_corporate_equities',
 81: 'personal_savings',
 82: 'personal_savings',
 83: 'gross_private_saving',
 84: 'house_debt_gdp_ratio',
 85: 'household_debt_service_pmtpctgdp',
 86: 'consumer_loan_delinquency_rate',
 87: 'creditcard_delinquency_rate',
 88: 'homeownership_rate',
 89: 'median_house_sale_price',
 90: 'real_residential_property_price',
 91: 'mortgage_delinquency',
 92: 'rental_vacancy_rate',
 93: 'pce_index',
 94: 'pce',
 95: 'real_pce',
 96: 'pce_durable_goods',
 97: 'real_pce_durable_goods',
 98: 'pce_nondurable_goods',
 99: 'pce_services',
 100: 'cpi',
 101: 'cpi_core',
 102: 'cpi_urban',
 103: 'cpi_housing_cities',
 104: 'cpi_primary_rent',
 105: 'cpi_vehicles',
 106: 'cpi_urban_transportation',
 107: 'cpi_medical',
 108: 'cpi_food_bev',
 109: 'cpi_eggs',
 110: 'cpi_apparel_cities',
 111: 'ecommerce_pct_of_totalsales',
 112: 'net_exports',
 113: 'net_exports_pctofgdp',
 114: 'net_trade',
 115: 'imports_goods_services',
 116: 'real_imports',
 117: 'all_commodities_import_price_index',
 118: 'imports_from_china',
 119: 'cpi_india',
 120: 'gross_domestic_private_investment',
 121: 'real_gross_domestic_private_investment',
 122: 'construction_spending',
 123: 'housing_starts'}

table_classes = {'stocks_gold_daily':Stocks_gold_daily,
                'consumer_monthly':Consumer_monthly,
                'ppi_monthly':Ppi_monthly,
                'consumers_quarterly':Consumers_quarterly,
                'misc_annual':Misc_annual,
                'misc_daily':Misc_daily,
                'gdp_quarterly':Gdp_quarterly,
                'dates':Dates,
                'm1m2':M1m2,
                'velocity':Velocity,
                'banks_week_month':Banks_week_month,
                'government_quarterly':Government_quarterly,
                'federal_reserve_weekly':Federal_reserve_weekly,
                'investment_month_quarter':Investment_month_quarter,
                'cpi_monthly':Cpi_monthly,
                'foreign_trade_month_quarter':Foreign_trade_month_quarter}

app = Flask(__name__)
CORS(app)
# STATIC_URL = '/static'
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'
@app.route("/")
def index():
    #need to tell index what data to use
    return render_template("index.html") #need additional arguments???

@app.route("/api/<table_name>/<column_name>")
def inflation_query(table_name, column_name):
    session=Session(engine)
    # column_name = series_index[series]
    # table_name = column_table_index[column_name]
    new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null')
    session.close()
    query_dates = []
    query_values = []
    no_xy_list = []
    xy_list = []
    return_dict = {}
    # xy_dict = {}
    for each_result in new_query:
        row=[each_col for each_col in each_result]
        xy_dict = {}
        no_xy_list.append(row)
        xy_dict['x']=f'{row[0]}'
        xy_dict['y']=f'{row[1]}'
        xy_list.append(xy_dict)
    return_dict['xy']=xy_list
    return_dict['no_xy'] = no_xy_list
        # xy_dict = {}
    #     query_dates.append(f'{row[0]}')
    #     query_values.append(row[1])
    #     query_dict = dict(zip(query_dates,query_values))
    new_data = jsonify(return_dict)
    return new_data #no_xy_list#, xy_list

@app.route("/correlation/<table6>/<column6>/<table7>/<column7>")
def calc_corr_coef(table6,column6,table7,column7):
    session=Session(engine)
    corr_query = session.execute(f'select date, {column6} from {table6} where {column6} is not null')
    corr_query2 = session.execute(f'select date, {column7} from {table7} where {column7} is not null')
    session.close()
    corr_query_dates=[]
    corr_query2_dates=[]
    corr_query_values=[]
    corr_query2_values=[]
    corr_coef_dict = {}
    for each_result in corr_query:
        row=[each_col for each_col in each_result]
        corr_query_dates.append(row[0])
        corr_query_values.append(row[1])
    for each_result in corr_query2:
        row=[each_col for each_col in each_result]
        corr_query2_dates.append(row[0])
        corr_query2_values.append(row[1])
    corr_dict = {'Date':corr_query_dates,
                'value1':corr_query_values}
    corr2_dict = {'Date':corr_query2_dates,
                'value2':corr_query2_values}
    corr_df = pd.DataFrame(corr_dict)
    corr2_df = pd.DataFrame(corr2_dict)
    merged_df = corr_df.merge(corr2_df, how='outer', on='Date')
    merged_df = merged_df.set_index('Date').sort_values('Date')
    corr_coef = sts.pearsonr(merged_df['value1'], merged_df['value2'])
    corr_coef_dict['corr_coef']=corr_coef[0]
    new_corr_coef = jsonify(corr_coef_dict)
    return new_corr_coef
    
if __name__ == "__main__":
    app.run(debug = True)