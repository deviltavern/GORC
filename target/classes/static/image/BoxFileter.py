import cv2
import numpy as np
'''
灰度图方框滤波器
'''
def BoxFilter(image,kernal,size):
    assert size%2==1,"size value is not right"
    rows,cols=image.shape
    for i in range(rows):
        for j in range(cols):
            sum,cnt,r=0.0,0,int(size/2)
            for ii in range(0,size):
                for jj in range(0,size):
                    if i+ii-r>=0 and i+ii-r<rows and j+jj-r>=0 and j+jj<cols:
                        cnt+=1
                        sum+=image[i+ii-r,j+jj-r]*kernal[ii,jj]
            sum=sum/cnt
            image[i,j]=int(sum)
    return image

if __name__ == '__main__':
    image=cv2.imread('test.jpeg')
    image=cv2.cvtColor(image,cv2.CV_32FC1)
    # cv2.imshow('src',image)
    # cv2.waitKey()
    kernal=np.ones((7,7))
    src=image.copy()
    # image=cv2.boxFilter(src,-1,(7,7))
    # cv2.imshow('sds',image)
    # cv2.waitKey()
    image=BoxFilter(image,kernal,7)
    cv2.imshow('image',image)
    cv2.waitKey()
