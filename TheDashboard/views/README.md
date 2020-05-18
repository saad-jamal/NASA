The NASA DataViz application is a data visualization tool that allows users to visualize key flight displays of a Boeing 737NG in real time. The user has the ability to plug in their own data, and run the simulation on their machine.

In order to get started, please format your data appropriately. The application expects a csv file whose first row is the list of variables, in order. If you are confused about the order take a look at the raw.csv file currently in the data folder.

The first step is placing your csv file in the "data" file and labeling it "raw.csv". Then the user can open their terminal, navigate to the appropriate directory, and start the server by typing "node index.js". The user should see a message informing them that the server has been started.

Then the user should open any browser of their choice and visit http://localhost:3000/

The first step is to allow the tool to read in the data. Visit http://localhost:3000/initialize and let the data be parsed.

Once you see the success message, visit http://localhost:3000/simulation to control the simulation.