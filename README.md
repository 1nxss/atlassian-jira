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

## Scene 2
Modifying the current values set for existing Gadgets.
If you also wish to modify the current values that users may have for the refresh interval of their Gadgets.
### Steps
#### Before you start:
- Backup your database first. In the case of problems, you can rollback!
- Stop your JIRA instance.
#### Modifications in the PostgreSQL database
Update the  `userprefvalue`  column of the  `gadgetuserpreference`  table where the  `userprefkey`  is  `'refresh'`  to change the refresh interval of the gadgets (note that this is defined per gadget).
You can set the auto refresh to a predetermined interval in minutes:

SETTING ALL EXISTING GADGETS AUTO REFRESH INTERVAL TO 4 HOURS

```sql
UPDATE gadgetuserpreference SET userprefvalue='240' WHERE userprefkey='refresh';
```
DISABLING REFRESH IN ALL EXISTING GADGETS

```sql
UPDATE gadgetuserpreference SET userprefvalue='false' WHERE userprefkey='refresh';
```
-   Start JIRA back

Note that any active dashboards will need to be reloaded for new setting to take effect.

## Scene 3
You may to use external plugin.
[Global CSS and JS for Jira](https://marketplace.atlassian.com/apps/1219330/global-css-and-js-for-jira?hosting=server&tab=overview) by Yiraphic
By the way, it's not tested with Data Center releases, but currently worked fine with 9.0.0 - 9.2.0 version. 
