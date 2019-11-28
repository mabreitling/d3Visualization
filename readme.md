### Question: How is the distribution of the functional status of water pumps in Tanzania for specific regions?
First things first: Visualization might not work properly if just ran locally. Works when started on a (local) webserver though.


#### Datasources::

1. **trainDataPreRed.csv:** preprocessed version of a challenge offered by DrivenData, constisted of over
40 variables originally, was heavily reduced for sake of file size.
2. **regionsInfo.json:** Information about regions in Tanzania. Created the file by the information given on https://en.wikipedia.org/wiki/Regions_of_Tanzania, just to give some background info for each clicked region.
3. **regions.geojson:** Path data for the map, features only contain the region names which are joined with the sources later on.

#### Possible Interactions:

1. Levels of the categorical (target) variable 'status_group' can be hidden/shown by group by checking the respective box to get  of the overplotting.
2. By clicking on a specific region the following things should happen:
  - Region is colored in beige/yellow.
  - Table in the right bottom corner is redrawn and offers some background
	information about the clicked region.
  - Barchart in the upper right corner redraws and gives an overview of the
	distribution in the respective region.
  - Mouseover over a region colors it in red and shows the name of the region
in the bottom left corner in the same color.

#### Screenshot of running vis:

![Screenshot of running vis](https://github.com/mabreitling/d3Visualization/blob/master/screenshot.png, "")
	




