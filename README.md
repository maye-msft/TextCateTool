# Text Categorization by Entity

This is a tool to catgorize/classify text with [named entity](https://en.wikipedia.org/wiki/Named-entity_recognition).

## Installation

* Mac OS: download [text-categorization-desktop-macos](./executable/text-categorization-desktop-macos) and run it.

* Windows: download [text-categorization-desktop-win.exe](./executable/text-categorization-desktop-win.exe) and run it.

* Linux: download [text-categorization-desktop-linux](./executable/text-categorization-desktop-linux) and run it.
  

## User Guide

###  1. Define Entity
Entity is consisted of a set of keywords, when defining a entity input a set of keywords in the textarea, using linebreak to split keywords.

![Entity Screenshot](/img/entity.png)


### 2. Define Category

Category is consisted of multiple rules. Eaach rule is consisited of primary condition and secondary condition. A text will be mapped into the category, when primary and secondary condaitions are all matched, secondary condition can be ignored when leaving it empty.

Condition is consisted of a set of Entities, if a text has one of keywords in one of the entities in the condition, it means the condition matched.

![Entity Screenshot](/img/category.png)


### 3. Start Analysis

Firstly, import a CSV with headers, such as

``` 
id,title,text
1,word1-1,word1-2 word2-1 other words
2,word2-1,word2-2 word1-1 other words
3,word2-1,word2-1 word3-1 other words
4,word3-1,word1-2 word3-2 other words
5,word3-2,word2-2 word3-1 other words
```
Secondly, choose **ID column**, **Title Column** and **Columns For Entity Extraction**
If text is in HTML format, check the **Strip HTML Tag**

Then click **Start** Button, it may takes a while to do entity extarction entity and categorization. After it finishing, two columns "Entity" and "Category" will be added.

Click **Exproort CSV** to get the results.

Using Filter dropdowm to looked into texts in different categories.

Based on the category rules, a text may be mapped in to multiple categories.

![Analysis Screenshot](/img/analysis.png)


### 4. Dashboard

In Dashboard, there are three charts, category bar chart, word cloud and entity networks chart.

Category Bar Chart
![Dashboard Screenshot](/img/dashboard-1.png)

Word Cloud
![Dashboard Screenshot](/img/dashboard-2.png)

Entity Network Chart
![Dashboard Screenshot](/img/dashboard-3.png)

### 5. Import/Export

It is supported to export entity, category and analysis results into a JSON file, and the JSON file can be inported.  

## Sample
Here is sample CSV file and JSON file

* [sample.csv](./sample/sample.csv)
* [sample project.json](./sample/sampleproject.json)

This README is show results of [sample project.json](./sample/sampleproject.json)

## Run with code

``` shell
npm install
npm run start-server
```

## Build Executable

``` shell
npm install pkg -g
npm install
gulp
npm run build-exe
```



