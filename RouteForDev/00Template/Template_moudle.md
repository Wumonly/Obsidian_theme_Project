# date
Date now: <% tp.date.now()%20%>
Date now with format: <% tp.date.now("DD%20MMMM YYYY") %>
Last week: <% tp.date.now("dddd%20Do MMMM YYYY", -7) %>
Today: <% tp.date.now("dddd%20Do MMMM YYYY, ddd") %>
Next week: <% tp.date.now("dddd%20Do MMMM YYYY", 7) %>
Last month: <% tp.date.now("YYYY-MM-DD",%20"P-1M") %>
Next year: <% tp.date.now("YYYY-MM-DD",%20"P1Y") %>
File's title date + 1 day (tomorrow):%20<% tp.date.now("YYYY-MM-DD",%201, tp.file.title, "YYYY-MM-DD") %>
File's title date - 1 day (yesterday):%20<% tp.date.now("YYYY-MM-DD",%20-1, tp.file.title, "YYYY-MM-DD") %>
Date tomorrow with format: <% tp.date.tomorrow("Do%20MMMM YYYY") %>    
This week's monday: <% tp.date.weekday("YYYY-MM-DD",%200) %>
Next monday: <% tp.date.weekday("YYYY-MM-DD",%207) %>
File's title monday: <% tp.date.weekday("YYYY-MM-DD",%200, tp.file.title, "YYYY-MM-DD") %>
File's title next monday: <% tp.date.weekday("YYYY-MM-DD",%207, tp.file.title, "YYYY-MM-DD") %>
Date yesterday with format: <% tp.date.yesterday("Do%20MMMM YYYY") %>
# file
File content: <% tp.file.content %>
File creation date: <% tp.file.creation_date()%20%>
File creation date with format: <% tp.file.creation_date("dddd%20Do MMMM YYYY HH:mm") %>
File cursor: <% tp.file.cursor(1)%20%>
File cursor append: <% tp.file.cursor_append("Some%20text") %>
File existence: <% tp.file.exists("MyFile")%20%>
File find TFile: <% tp.file.find_tfile("MyFile").basename%20%>
File Folder: <% tp.file.folder()%20%>
File Folder with relative path: <% tp.file.folder(true)%20%>
File Include: <% tp.file.include("\[\[Template1\]\]")%20%>
File Last Modif Date: <% tp.file.last_modified_date()%20%>
File Last Modif Date with format: <% tp.file.last_modified_date("dddd%20Do MMMM YYYY HH:mm") %>
File Move: <% await tp.file.move("/A/B/"%20+ tp.file.title) %>
File Move + Rename: <% await tp.file.move("/A/B/NewTitle")%20%>
File Path: <% tp.file.path()%20%>
File Path with relative path: <% tp.file.path(true)%20%>
File Rename: <% await tp.file.rename("MyNewName")%20%>
Append a "2": <% await tp.file.rename(tp.file.title%20+ "2") %>
File Selection: <% tp.file.selection()%20%>
File tags: <% tp.file.tags %>
File title: <% tp.file.title %>
Strip the Zettelkasten ID of title (if%20space separated): <% tp.file.title.split("%20")\[1\] %>
# fontmaster
File's metadata alias: <% tp.frontmatter.alias %>
Note's type: <% tp.frontmatter\["note type"\] %>
# system
Clipboard content: <% tp.system.clipboard()%20%>
Entered value: <% tp.system.prompt("Please%20enter a value") %>
Mood today: <% tp.system.prompt("What%20is your mood today ?", "happy") %>
Mood today: <% tp.system.suggester(\["Happy",%20"Sad", "Confused"], \["Happy", "Sad", "Confused"]) %>
Picked file: \[\[<% (await%20tp.system.suggester((item)%20=> item.basename, app.vault.getMarkdownFiles())).basename%20%>]]
# Web
Web Daily quote:
<% tp.web.daily_quote()%20%>
Web Random picture:
<% tp.web.random_picture()%20%>
Web Random picture with size:
<% tp.web.random_picture("200x200")%20%>
Web random picture with size + query:
<% tp.web.random_picture("200x200",%20"landscape,water") %>



