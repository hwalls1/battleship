//
//  person.h
//  attempt4
//
//  Created by Harrison Walls on 10/30/18.
//  Copyright © 2018 Harrison Walls. All rights reserved.
//

#ifndef person_h
#define person_h

#include <ctime>
#include <stdexcept>
#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>


using namespace std;
using namespace cv;

class Person {
public:
    
    Point last_rect;
    //vector<Rect> all_position;
    bool committed;
   
};

vector<Person> people;

#endif /* person_h */
