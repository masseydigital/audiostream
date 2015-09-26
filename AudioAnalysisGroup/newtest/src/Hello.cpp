//============================================================================
// Name        : Hello.cpp
// Author      : asdf
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
	for (int x = 1; x < argc; x++)
	{
		cout << argv[x] << endl;
	}


	return 0;
}
