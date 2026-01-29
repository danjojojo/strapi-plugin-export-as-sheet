# strapi-plugin-export-as-sheet

A plugin for Strapi to export a collection as an Excel Spreadsheet.

## Requirements
- Strapi v5.33.1+

## Installation
```
npm i strapi-plugin-export-as-sheet
```

## Settings
This plugin has its own Settings section where user can select which collections can be exportable. 
In the Admin Panel side bar, go to `Settings` then scroll down until you see the `Export as Sheet` section and the `Settings` page.

## Changelog

### 1.0.1
- Added validation for column of type 'datetime' before parsing to ISO format

### 1.0.2
- Added dialog pop-up if error occurs during API call
