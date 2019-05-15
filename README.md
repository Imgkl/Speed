# Speed - Minimal

## *PREVIEW*:

![Alt text](README/p0.png?raw=true "Title")

This is a simple and minimal way of finding the user's network speed.

## *CONCEPT*:

This simple concept behind this web application is to calculate how much time it takes to completly download the .bin files.

#### PS: These Binary files are not excatly downloaded. ie, They wont occupy size in your HDD, when you download it.



## *OPTIONS*:

In this application, you can select the buttons to choose the size of the file to download. 
The file size options are
- 1MB
- 5MB
- 10MB
- 100MB
- 1000MB/1GB


## *CREATION OF THE BINARY (.bin) FILES*:

You can easily create the binary file by running the following command.

``` dd if=/dev/zero of=100mb.bin bs=10M count=1 ```

#### Explanation: 
of: File name.

bs: File size.

