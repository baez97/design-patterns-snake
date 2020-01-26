# Design Patterns in Software Engineering
### Definition
According to _Gof_ book __Design Patterns: Elements of Reusable Object-Oriented Software__, this is the definition:

> Design Patterns in this book are descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context.

We can conclude two facts from this definition:
* Design Patterns are applied in __Object Oriented Programming__, as we are dealing with classes and objects.
* Design Patterns are related to the way we can customize the relationships between classes and objects in our solution. That is, we are not dealing with how we code, but with how we design the classes.

But how can you describe the relationships between objects? Obviously with schemes, and the more universal the language of our schemes the better, that is where UML comes in.

### UML
UML stands for Universal Modeling Language, and it is a tool we can use for sharing our models with our team or others. It purposes different types of schemes for modeling, but we are focusing on the main one for Design Patterns: the [Class Diagram](https://en.wikipedia.org/wiki/Class_diagram).

> However, you do not need to know UML to understand this article. In fact, I am not using any UML modeling tool or following its schemes in an strict way. Instead, I am using Keynote to draw a basic scheme of the classes we are using and how they are connected. Nevertheless, I highly recommend having a look to the UML documentation if you want to go further with Software Design.

## Chapter 0: The Snake Game
One of the best ways to learn Design Patterns is through a game, as there is a lot of interactivity between the objects, and you can see it graphically. The Snake Game happens to be a good example for this topic, so in this repository we are dealing with the development of the game using some Design Patterns. You can follow the Commit history in order to see the progression from one Pattern to the next one.

### Definion of the Game
The main purpose of this game is to make the snake eat the food of the scenario without getting hit with the obstacles, walls or with the snake itself (whose lenght increases as it eats). How long can you survive?

The concept is simple, but there are a lot of Snake Games with different rules and behaviours, so the first step is to define how our Snake Game is going to be.

#### Functional Definition
I raise the idea of working with an NxN board of cells, where the head of the snake starts at position (N,N), and every X seconds the snake moves by itself in the direction the player sets, being the first direction up.

The board will have obstacles and fruits at random positions, so that if the snake reaches them they will affect its length:
* Obstacles will decrease the lenght of the snake by one.
* Fruits will increase the lenght of the snake by one, but they can disappear from the board after some seconds, so they will only take effect if the snake reaches them before they disappear.

The game will be generating fruits in random positions along the game, and the player loses when the snake reaches 0 length.

### Technical approach
A two dimensional array seems to be a correct way of dealing with the cells, but how can we deal with all the positions of the snake? We could set a snake-position collection and compare it with the cells' position every "tick" of the game, updating that collection everytime the snake moves, increases or decreases its length... But that is not for what you are reading this.

#### Respecting the Main Purpose of a class
Even if the Design Patterns book includes a list of well-known patterns, the objective of learning them is to achive a decoupled and flexible solution for our software projects. So we should start from the basic things, right?

In order to increase the flexibility of our solution, what we are going to do is to develop it in a fine-grained modular way, using little objects where we can delegate logic so that our classes have a well defined main purpose, and their behaviour is focused on that.

#### Cell Counter approach
We can face the all-snake-positions problem by dealing with each cell as an object itself, and not as a pair of integers in an array. This way, each cell can have attributes and methods, and we can solve the problem in a simpler way:
1. A Cell class that has a counter attribute.
2. Every time the snake reaches a position, it sets the Cell's counter to its current lenght.
3. Every tick of the game, each cell decreases its counter, and if it is 0, it becomes empty.

And that's it, simple, flexible and easy to maintain. So we have a deal, let's begin!

#### Programming Language
As stated in the [Definition Section](#definition), Design Patterns just rely on how objects communicate, not on how they are coded. The only constrain for choosing a language if you want to learn DP is that it should support Object Oriented Programming, that is, declaration of classes and objects.

I chose JavaScript for three reasons:
* It has a minimalist syntax, so that you can focus on objects.
* Web development usually requires less lines of code for the view, and JavaScript is the best language for it.
* There are very useful frameworks in the community like React for maintaining the view synchronized with the model without having to write the code for updating it.

#### Coding
Inside the `src` folder of my new `create-react-app` project, I am setting two folders: View and Model. Each class on the model will have its corresponding view, allowing me to develop the game in a modular way.
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/1-Setup.png"/>
</p>

> In order to focus on Design Patterns, this article will not explain the View Coding or the framework details, but just the Model.

## Chapter 1: I want to talk to my lawyer
The first step would be defining classes for the Snake and the Cells, but how do we connect both? Well, the Cells may have a Snake property and viceversa, so that they can communicate commands with each other like "Hey Cell, I am here now" or "Hey snake, there's an obstacle here, decrease your length". That would be correct, good, and solves the problem.

But what would happen...
* If we decided to create another type of cell, like an obstacle, would we had to reimplement the Snake class?
* If there are more actors in the game like Enemies, another Snake, moving food... would we had to reimplement the Cells class and their relationships?

By connecting both classes directly, we are losing flexibility and reusability.

### The Mediator Pattern
Mediator is an structural pattern that encapsulates the way two classes interact within a class. That is, instead of connecting two classes directly, we connect both to a higher class that will be in charge of their interaction. 

In the book, this problem is described using a form example where different widgets of the form (text inputs, checkboxes, radio buttons...) depends on each other behaviour. That is, a particular textfield should be disabled unless a particular radio button is selected. If we connect both classes, the text input and the radio button directly, and then we need to add a third widget or reuse this connection in another form, it is much more complicated to do so than if we wrap all the widget in a Form class that has connected all the elements and controls the relations between them.

In this game, how could be call the mediator class? Well, it seems like its main purpose will be contain the snake and a collection of cells. What about `Board`? 
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/2-Mediator.png"/>
</p>

### Implementation
The board class will create a Snake and a collection of Cells in its constructor, and it will contain the logic of the interaction between both. 
In order to see if everything went well, I developed a simple GUI that displays the counter of every cell of the board.
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/3-CounterView.png"/>
</p>

But the purpose of the `Board` class was not only to contain the cells collection and the Snake, but also to communicate them. Let's add a `tick` method to it that calls the `tick` method of each cell, and executes the `move` method of the Snake, which will make the Snake move upwards by now. From the View code, I have linked the `keyPressed` event to this `tick` method. This is the result:
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/4-SnakeCounters.gif"/>
</p>