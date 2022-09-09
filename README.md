# Modifying Gadgets refresh interval
## Scene 1
You may want to modify the refresh interval of JIRA's Dashboard Gadgets.
Modification of a couple of files are required:
### Steps:
#### Before you start:
 -   Stop your JIRA instance.
#### Modifications in the files:
 -   Open the  `atlassian-gadgets-publisher-plugin-XX.YY.ZZ.jar` 
located in  `**JIRA-INSTALL**/atlassian-jira/WEB-INF/atlassian-bundled-plugins/  

 - In order to open the .jar file, rename it to .zip and decompress it.  
 - Inside it, you have to modify two files under the  `ajs-gadgets`  folder (as of JIRA 6.x, the path is  `ajs-gadgets/gadgets)`
`ajs.gadget.configurable.js`
`ajs.gadget.configurable-min.js`
 -   Look for the following excerpt:
```
options: [
	{value: "false", label: gadget.getMsg("gadget.common.refresh.never")},
	{value: "15", label: AJS.format(gadget.getMsg("gadget.common.refresh.minutes"), 15)},
	{value: "30", label: AJS.format(gadget.getMsg("gadget.common.refresh.minutes"), 30)},
	{value: "60", label: AJS.format(gadget.getMsg("gadget.common.refresh.hour"), 1)},
	{value: "120", label: AJS.format(gadget.getMsg("gadget.common.refresh.hours"), 2)}
 ],
```
-   Inside the  `options`  you can add or remove options for refresh intervals.
-   After modifying the values in both files, save it and compress the plugin directory.  
-   Add the file back to the  `atlassian-bundled-plugins.zip`.
-   To make sure that you will get fresh bundled plugins, remove all contents of  `$JIRA_HOME/plugins/.bundled-plugins`.
- Start JIRA instance back
