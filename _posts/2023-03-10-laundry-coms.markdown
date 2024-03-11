---
layout: post
title:  "Laundry-Comms!"
date:   2024-3-10 23:59:59 -0500
categories: blog
---

<img src="/assets/images/laundry-coms.png" href="https://github.com/lukewangm/laundry-coms" >

# Laundry-Comms Motivation

I live in an apartment complex with 20 units and 2 washing machines. There's been a number of times where I'd want to do my laundry, but someone else's laundry is still in the machine. I want to be courteous and wait 15 minutes before I even think about moving their clothes, but then I lose 15 minutes of laundry time. I personally avoid this by setting an alarm for 40 minutes so I know to come get my laundry when it is done. However, I know that not everyone does that and the urgency to get clothes might not be that high.

This led me to come up with the idea of creating a simple application to track laundry and enable SMS to remind laundry retrieval. 

# Creating Html Page

It was easy to make the page and incorporate a timer that ticks from 35 minutes or 45 minutes based on the setting. However, the first issue that I ran into was making sure that the timer will remain running when I leave the application. There are two main reasons this is necessary. First, the user will likely not stay on the webpage after setting the timer, and secondly this will allow other users to check the status of the laundry without having to physically go to the laundry room.

# Creating the Timer Logic

I created a separate javascript file to contain the two functions that start and reset the timers. 

# Synchronization of Timers

I did not expect it to be difficult to make sure the timers run in synchronization. I started by hosting this webpage on Vercel and I thought that the instances of timers would be synced across the website, but I quickly realized that I needed to create a server that runs on the website.

https://stackoverflow.com/questions/67855874/how-to-synchronise-a-timer-for-everyone-client

# The Server

Initially, I did not think I would need to implement server and client functionality, but for the timer to be synchronized across devices I needed a server to share the starting/ending time of the timer. ** This turned out to be the most difficult part of my project ** 

This was my understanding of basic requirements for how I would go about implementing this:

Server:
- sends message to all clients every time it received a message from a client
- sends message to newly opened clients

Client:
- sends message to server, when start or reset button is pressed

# Issue 1

An issue that I ran into hosting this application on a EC2 instance was that I could not access the public IP associated with my EC2 instance. This meant that I could not connect to the instance my code was running on. To solve this, I needed a work around that involves separating my frontend and my backend. Proposed Solution: In this new iteration, I will host my backend (server) in the EC2 instance, and host my clients (the timers) on Vercel. The frontend on vercel will make calls to the server in the EC2 instance, which will hopefully allow the clients to be synced up.

*The above ended up not working for me because in order to host a website on Vercel that uses web sockets, the connections had to be 'wss'. This meant that the messages needed to be "secure" and that requires a SSL certificate for production usage. For the purpose of this project, I was hoping that I could have done the project with basic unsecured connections since it would have be easier to work with.*

The work around that I came up with was then to keep the unsecure websocket and not host the website on Vercel.

# Issue 2

Another key part of this project that I had planned was to be able to use a free SMS API in order to send a remainder to a registered user that their laundry has finished. I did extensive searching and signed up for various services only to find out that all of the free ones don't offer the option to send messages to phone numbers that are not registered in the system. Moreover, in some of the API's that seemed promising, upon downloading the required libraries to operate the API, they turned out to be outdated and unusable. This came as a huge disappointment to me because, first I wasn't able to truly deploy what I have made, and now I am not able to get the text message notification to work.

Alternatively I searched for Email API's instead, but most of those services were apart of the same ecosystem as the SMS apis that did not work earlier. Some services I examine were: Brevo, Twilio, Mailjet, and OneSignal.

While I may have been unsuccessful in incorporating a notification system in this project, I know that there are services out there that will allow me to do this. They would just require more research and likely requires a lot more encryption and hashing to secure user information.

# Key takeaways

This was an educational project for me because was the first time that I have built and deployed something other than a static website. I gained a new understanding of how servers and clients work together to send information and the plethora of services that can be used to accomplish the deployment of an application.

I learned that in order to have data being shared in real time across devices, there must be a server that is running consistently and how that can be achieved using an AWS EC2 instance. However, the EC2 instance alone does not get this done because any server that is started in the terminal of the instance is stopped once the terminal is closed, even if the instance is still running. The solution to this was using PM2, a process management service that keeps an application running continuously.

This project was also my first time working with React.JS on my own. I now have an better understanding of the organization of React projects, and that understanding will help me deploy software in React more easily in the future.

Additionally, previously though I have worked with packages and open source libraries, I never had a true understanding behind the purpose of npm. I learned that the node_modules inside of React projects are just additional functions that have been written to make development easier reducing the need for as much boiler plate code.

# Next steps

Though the time I have allocated toward this project has passed, I will continue to spend time to finishing up this website because the laundry problem is real to me and I hope that a working version of this product will help put an end to the need for me to make those extra trips to the laundry room.

Here are the things that still need to be done:

1. Properly deploy the website to a domain by obtaining a SSL license, and gain a better understanding of how connections/data can be secured
2. Implement a SMS or Email notification system
3. Optimize the program, so there are less pings to and from the server 
4. Implement a comments under timers that clear 15 minutes after the associated timer ends
