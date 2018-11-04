//
//  main.cpp
//  attempt4
//
//  Created by Harrison Walls on 10/23/18.
//  Copyright © 2018 Harrison Walls. All rights reserved.
//
//

#include <iostream>
#include <opencv2/opencv.hpp>
#include "person.h"

using namespace std;
using namespace cv;

int main (int argc, const char * argv[])
{
    VideoCapture cap(CV_CAP_ANY);
    cap.set(CV_CAP_PROP_FRAME_WIDTH, 320);
    cap.set(CV_CAP_PROP_FRAME_HEIGHT, 240);
    if (!cap.isOpened())
        return -1;

    Mat img;
    HOGDescriptor hog;
    hog.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());

    namedWindow("video capture", CV_WINDOW_AUTOSIZE);
    while (true)
    {
        cap >> img;
        if (!img.data)
            continue;

        vector<Rect> found, found_filtered;
        hog.detectMultiScale(img, found, 0, Size(8,8), Size(32,32), 1.05, 2);
        
        // Throws out any rectangle that is inside another rectangle.
        size_t i, j, h;
        for (i=0; i<found.size(); i++)
        {
            Rect r = found[i];
            for (j=0; j<found.size(); j++)
                if (j!=i && (r & found[j])==r)
                    break;
            if (j==found.size())
                found_filtered.push_back(r);
        }
        
        // Draws each rectangle. 
        for (i=0; i<found_filtered.size(); i++)
        {
            Rect r = found_filtered[i];
            
            // Checks if the rectangle is a possible human by
            // checking if the width is less than the height.
            if(r.width < r.height)
            {
                // Draws a rectangle around objects that are human like.
                rectangle(img, r.tl(), r.br(), cv::Scalar(0,255,0), 2);
                // For each Person in people.
                for(h = 0; h < found_filtered.size(); h++)
                {
                    // what should i call this new person?
                    // Creates a new person.
                    Person foo;
                    foo.last_rect = r.br();
                    foo.committed = false;
                }
                
                // Checks if the br() crossed a certain point and if it was counted yet
                // Should this go in the for loop?
                if(/* check if point br() crosses a certain point*/ && foo.committed == false)
                {
                    int count = 0;
                    count++;
                    foo.committed = true;
                    cout<< "People counted:" << count << endl;
                }
            }
        }
        imshow("video capture", img);
        if (waitKey(20) >= 0)
            break;
    }
    return 0;
}
