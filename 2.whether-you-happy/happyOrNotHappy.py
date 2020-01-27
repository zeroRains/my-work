import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import operator 
from matplotlib import font_manager
font=font_manager.FontProperties(fname=r"c:\\windows\\fonts\\simsun.ttc", size=16)


def loadData(filename):
    '''读取训练数据'''
    data = pd.read_csv(filename)
    data = np.array(data,dtype="int64")
    dataMat = data[:,1:3]
    labelMat = data[:,3]
    return dataMat,labelMat

def loadTest(fileName):
    '''读取测试数据'''
    data = pd.read_csv(fileName)
    data = np.array(data,dtype="int64")
    dataMat = data[:,1:3]
    labelMat = data[:,3]
    return dataMat,labelMat

def changeNum(dataSet):
    '''将数据转化成0-1的值'''
    row = dataSet.shape[0]
    # 返回每一列的最大值
    maxNum = dataSet.max(0)
    minNum = dataSet.min(0)
    ranges = maxNum-minNum
    tempData = dataSet - np.tile(minNum,(row,1))
    newData = tempData/np.tile(ranges,(row,1))
    return newData,minNum,ranges

def drawPoint(dataMat,labelMat,dataMat1):
    '''数据可视化'''
    x1 = []
    x2 = []
    y1 = []
    y2 = []
    age = [i for i in range(int(dataMat1.min(0)[0]),int(dataMat1.max(0)[0])+1)]
    salary = [i for i in range(int(dataMat1.min(0)[1]),int(dataMat1.max(0)[1])+1)]
    b = np.linspace(0,100,len(age))/100
    salary = sorted(dataMat1[:,1])
    for i in range(dataMat.shape[0]):
        if(labelMat[i] == 1):
            x1.append(dataMat[i][0])
            y1.append(dataMat[i][1])
        if(labelMat[i] == 0):
            x2.append(dataMat[i][0])
            y2.append(dataMat[i][1])
    plt.figure(figsize=(15,8),dpi=80)
    plt.scatter(x1,y1,c="r",s=40)
    plt.scatter(x2,y2,c="b",s=40)
    plt.title("年龄——薪水散点图",fontproperties = font,size=30)
    plt.xlabel("年龄",fontproperties = font,size=30)
    plt.ylabel("年薪",fontproperties = font,size=30)
    plt.xticks(b[::3],age[::3],size=12)
    plt.yticks(b[::3],salary[::3],size=12)
    plt.legend(labels=["happy","unhappy"],loc="upper left")
    plt.show()

def classify0(inX,dataMat,labelMat,toler=11):
    '''KNN算法'''
    row = dataMat.shape[0]
    data = np.tile(inX,(row,1)) - dataMat
    data = data**2
    data = data.sum(axis=1)
    data = data**0.5
    # 获取升序排序后的索引值
    sortIndex = data.argsort()
    # 用于记录结果的字典
    classCount={}
    for i in range(toler):
        label = labelMat[sortIndex[i]]
        # 用关键字来找值，如果没找到就用默认值
        classCount[label] = classCount.get(label,0) + 1
    # 根据字典的值升序排列
    resultClassCount = sorted(classCount.items(),key=operator.itemgetter(1),reverse=True)
    return resultClassCount[0][0]

def judge(result):
    '''判断对方是否开心'''
    if result == 1:
        print("你现在的生活十分开心")
    elif result == 0:
        print("你现在的生活让他很不开心")
    else:
        print("出问题了")

def changeTestNum(testNum,minNum,ranges):
    '''测试集数据转化成0-1'''
    row = testNum.shape[0]
    tempData = testNum - np.tile(minNum,(row,1))
    newData = tempData/np.tile(ranges,(row,1))
    return newData

def testTheMethod(newData,testLabels):
    '''错误率检测'''
    errorCount = 0
    now = -1
    totle = newData.shape[0]
    for data in newData:
        result = classify0(data,dataMat,labelMat)
        now += 1
        if result != testLabels[now]:
            print("第%d个数据：当前预测是：%d   真实是：%d" %(now+1,result,testLabels[now]))
            errorCount += 1
    print("错误率为：%.1f%%" % float(errorCount/totle * 100))
    # judge(result)

def inputTest(dataMat,labelMat,minNum,ranges):
    age = input("请输入你的年龄：")
    salary = input("请输入你的年薪：")
    newData = np.array([[age,salary]],dtype="int64")
    newData = newData - minNum
    newData = newData/ranges
    result = classify0(newData,dataMat,labelMat)
    judge(result)


np.set_printoptions(suppress=True) #不用科学计数法
# 读取训练数据
dataMat1,labelMat = loadData("2.whether-you-happy\\train.csv")
# 将训练数据转化成0-1
dataMat,minNum,ranges = changeNum(dataMat1)
# 可视化过程
drawPoint(dataMat,labelMat,dataMat1)
# 读取测试数据
testMat,testLabels = loadTest("2.whether-you-happy\\test.csv")
# 将测试数据化成0-1
newData = changeTestNum(testMat,minNum,ranges)
# 检测错误率
testTheMethod(newData,testLabels)
# 手动检测你是否开心
inputTest(dataMat,labelMat,minNum,ranges)