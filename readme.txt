Question: How is the distribution of the functional status of water pumps in Tanzania
for specific regions?

Only some words to the visualization, I'm not sure if that suits the level you thought about.

In case anything is not showing/working just a few words what it actually
should do:

There are three datasources:

1) trainDataPreRed.csv
- preprocessed version of a challenge offered by DrivenData, constisted of over
40 variables originally, was heavily reduced for sake of file size:

https://www.drivendata.org/competitions/7/pump-it-up-data-mining-the-water-table/
- kept are only the variables longitude/latitude of the pumps, the region and the 
target variable'status_group' which contains the functional status of the respective
group (3 levels: functional, needs repair, non functional)

2) regionsInfo.json
- information about regions in Tanzania:
Created the file by the information given on https://en.wikipedia.org/wiki/Regions_of_Tanzania,
just to give some background info for each clicked region. 

3) regions.geojson
- path data for the map, features only contain the region names which are joined
with the sources above later on

Possible interactions:
1) variable 'status_group'with three levels, which can be hidden/shown by group by 
checking the respective box to get rid of the overplotting.

2) by clicking on a specific region two things should happen:
	- region is colored in beige/yellow
	- table in the right bottom corner should redraw and offer some background
	information about the clicked region
	- barchart in the upper right corner should redraw and give and overview of the
	distribution in the respective region 

3) a mouseover over a region should color it in red and show the name of the region
in the bottom left corner in the same color. 
	



