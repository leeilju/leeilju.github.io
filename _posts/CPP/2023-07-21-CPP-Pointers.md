---
title : "C++ Pointers"
categories :
    - CPP
tag :
    - C++ Pointers
toc : true
toc_sticky: true
comments: true
sidebar_main: true
date: 2023-07-21-14:30:16
---

# Pointers

Pointers have traditionally been a stumbling block for many students learning C++, but they do not need to be!

*A C++ pointer is just a variable that stores the memory address of an object in your program.*

That is the most important thing to understand and remember about pointers - they essentially keep track of *where* a variable is stored in the computer's memory.

C++ program can be written without using pointers extensively (or at all). However, pointers give you better control over how your program uses memory.



## 1. **Accessing a Memory Address**

Each variable in a program stores its contents in the computer's memory, and each chunk of the memory has an address number. For a given variable, the memory address can be accessed using an ampersand in front of the variable. To see an example of this, execute the following code which displays the [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) memory addresses of the variables `i` and `j`:

```cpp
#include <iostream>
using std::cout;

int main() {
    int i = 5;
    int j = 6;
    
    // Print the memory addresses of i and j
    cout << "The address of i is: " << &i << "\n";
    cout << "The address of j is: " << &j << "\n";
}
```

> The address of i is: 0x7fbb976b1e50

> The address of j is: 0x7fbb976b1e54



At this point, you might be wondering why the same symbol `&` can be used to both access memory addresses and, as you've seen before, pass references into a function. This is a great thing to wonder about. The overloading of the ampersand symbol `&` and the `*` symbol probably contribute to much of the confusion around pointers.

**The symbols & and * have defferent meaning, depending on which side of an equation they appear**

*This is extremely important to remember.* For the `&` symbol, if it appears on the left side of an equation (e.g. when declaring a variable), it means that the variable is declared as a reference. If the `&` appears on the right side of an equation, or before a previously defined variable, it is used to return a memory address, as in the example above.



## 2. **Storing a Memory Address (int type)**

Once a memory address is accessed, you can store it using a pointer. A pointer can be declared by using the `*` operator in the declaration. See the following code for an example:

```cpp
#include <iostream>
using std::cout;

int main() 
{
    int i = 5;
    // A pointer pointer_to_i is declared and initialized to the address of i.
    int* pointer_to_i = &i;
    
    // Print the memory addresses of i and j
    cout << "The address of i is:          " << &i << "\n";
    cout << "The variable pointer_to_i is: " << pointer_to_i << "\n";
}
```

> The address of i is:          0x7feb1466fe4c

> The variable pointer_to_i is: 0x7feb1466fe4c



As you can see from the code, the variable `pointer_to_i` is declared as a pointer to an `int` using the `*` symbol, and `pointer_to_i` is set to the address of `i`. From the printout, it can be seen that `pointer_to_i` holds the same value as the address of `i`.



## 3. **Getting an Object Back from a Pointer Address**

Once you have a pointer, you may want to retrieve the object it is pointing to. In this case, the `*` symbol can be used again. This time, however, it will appear on the right hand side of an equation or in front of an already-defined variable, so the meaning is different. In this case, it is called the "dereferencing operator", and it returns the object being pointed to. You can see how this works with the code below:

```cpp
#include <iostream>
using std::cout;

int main() 
{
    int i = 5;
    // A pointer pointer_to_i is declared and initialized to the address of i.
    int* pointer_to_i = &i;
    
    // Print the memory addresses of i and j
    cout << "The address of i is:          " << &i << "\n";
    cout << "The variable pointer_to_i is: " << pointer_to_i << "\n";
    cout << "The value of the variable pointed to by pointer_to_i is: " << *pointer_to_i << "\n";
}
```

> The address of i is:          0x7f50e0b898ec
>
> The variable pointer_to_i is: 0x7f50e0b898ec
>
> The value of the variable pointed to by pointer_to_i is: 5



In the following example, the code is similar to above, except that the object that is being pointed to is changed before the pointer is dereferenced. Before executing the following code, guess what you think will happen to the value of the dereferenced pointer.

```cpp
#include <iostream>
using std::cout;

int main() {
    int i = 5;
    // A pointer pointer_to_i is declared and initialized to the address of i.
    int* pointer_to_i = &i;
    
    // Print the memory addresses of i and j
    cout << "The address of i is:          " << &i << "\n";
    cout << "The variable pointer_to_i is: " << pointer_to_i << "\n";
    
    // The value of i is changed.
    i = 7;
    cout << "The new value of the variable i is                     : " << i << "\n";
    cout << "The value of the variable pointed to by pointer_to_i is: " << *pointer_to_i << "\n";
}
```

> The address of i is:          0x7fcf89e338ec
>
> The variable pointer_to_i is: 0x7fcf89e338ec
>
> The new value of the variable i is                     : 7
>
> The value of the variable pointed to by pointer_to_i is: 7



## 4. **Pointers to Other Object Types**

Although the type of object being pointed to must be included in a pointer declaration, pointers hold the same kind of value for every type of object: just a memory address to where the object is stored. In the following code, a vector is declared. Write your own code to create a pointer to the address of that vector. Then, dereference your pointer and print the value of the first item in the vector.

```cpp
#include <iostream>
#include <vector>
using std::cout;
using std::vector;

int main() {
    vector<int> v {1, 2, 3};
    
    vector<int> *pointer_to_v = &v;

    for (int a: v) {
        cout << a << "\n";
    }
    
    cout << "The first element of v is: " << (*pointer_to_v)[0] << "\n";
}
```

> 1
>
> 2
>
> 3
>
> The first element of v is: 1



## 5. **Passing Pointers to a Function**

Pointers can be used in another form of pass-by-reference when working with functions. When used in this context, they work much like the references that you used for pass-by reference previously. If the pointer is pointing to a large object, it can be much more efficient to pass the pointer to a function than to pass a copy of the object as with pass-by-value.

In the following code, a pointer to an int is created, and that pointer is passed to a function. The object pointed to is then modified in the function.

```cpp
#include <iostream>
using std::cout;

void AddOne(int* j)
{
    (*j)++;
}

int main() 
{
    int i = 1;
    cout << "The value of i is: " << i << "\n";
    
    int* pi = &i;
    AddOne(pi);
    cout << "The value of i is now: " << i << "\n";
}
```

> The value of i is: 1

> The value of i is now: 2



When using pointers with functions, some care should be taken. If a pointer is passed to a function and then assigned to a variable in the function that goes out of scope after the function finishes executing, then the pointer will have undefined behavior at that point - the memory it is pointing to might be overwritten by other parts of the program.



## 6. **Returning a Pointer from a Function**

You can also return a pointer from a function. As mentioned just above, if you do this, you must be careful that the object being pointed to doesn't go out of scope when the function finishes executing. If the object goes out of scope, the memory address being pointed to might then be used for something else.

In the example below, a reference is passed into a function and a pointer is returned. This is safe since the pointer being returned points to a reference - a variable that exists outside of the function and will not go out of scope in the function.

```cpp
#include <iostream>
using std::cout;

int* AddOne(int& j) 
{
    j++;
    return &j;
}

int main() 
{
    int i = 1;
    cout << "The value of i is: " << i << "\n";
    
    int* my_pointer = AddOne(i);
    cout << "The value of i is now: " << i << "\n";
    cout << "The value of the int pointed to by my_pointer is: " << *my_pointer << "\n";
}
```

> The value of i is: 1
>
> The value of i is now: 2
>
> The value of the int pointed to by my_pointer is: 2