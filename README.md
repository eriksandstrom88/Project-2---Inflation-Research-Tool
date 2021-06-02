# Project-2---Inflation-Research-Tool
# Project-3---Upgraded Inflation-Research-Tool with Machine Learning functionality added

This project is the culmination of three projects for the University of Denver's Data Analytics Bootcamp, and I intend to continue to add to it and use it in my own research in the coming months.

I wanted to create a tool for economists like me to be able to analyze data acquired from the St. Louis Federal Reserve's Federal Reserve Economic Data (FRED) API.

The tool includes a line chart for visualizing time series economic data, and corresponding summary statistics tables.  The user can choose up to 5 data series to visualize on the chart using dropdowns.  The numbers in the dropdowns correspond to the index table at the bottom of the page.  The summary statistics tables are responsive to changing data selections, as well as to the user zooming in on a certain time interval for a closer look.

The table to the right of the dropdowns displays the full name of the data series, as well as the units, time interval, start date, and end date.

The scatter plot below allows the user to take a closer look at a direct comparison of two data series.  Using similar dropdowns, the user can select which series to examine.  Additionally, the user may select "change" or "percent change," which are calculted based on the main series.

Finally, below the scatter plot are three regression models for forecasting three of the mainstream measures of inflation: Consumer Price Index, Personal Consumption Expenditures, and GDP Deflator.  The user can in put values for as many as 10 variables to see how they affect the forecast.

The data is stored in a PostgreSQL database.  I use a Flask application in combination with JavaScript, HTML and CSS to build all of the functionality.

I am the sole author of the entire application, though I did receive some help and guidance from the teaching staff of the bootcamp, Kevin Lee, Adrienne Tecza, and Leah Stuckey.

I still have big plans for adding features, functionality, more complex models and more friendly user interface in the coming months.

IMPORTANT NOTE:  NONE OF MY DATA SOURCES ARE CITED IN THE APPLICATION, WHICH IS THE PRIMARY REASON THE APPLICATION IS NOT PUBLISHED ONLINE.  ALL DATA WAS PULLED FROM THE ST. LOUIS FEDERAL RESERVE'S FRED WEBSITE WITH THE EXCEPTION OF STOCK DATA TAKEN FROM THE WALL STREET JOURNAL.  PROPER CITATION WILL BE INCLUDED IN THE NEXT VERSION OF THIS APPLICATION.
