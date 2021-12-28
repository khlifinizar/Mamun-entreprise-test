package com.mamun.service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;


public interface DataService {
	List<String> reduceFile(int nbrToTreat, List<String> file);

	List<String> inversFile(List<String> file);

	List<String> fullJoin(List<String> firstFile, List<String> secondFile, int nbrToTreat);

	List<String> normalJoin(List<String> firstFile, List<String> secondFile);

	List<String> flowNow(List<String> firstFile, List<String> secondFile, int nbrToTreat, String collationType);

	File createCsvfromData(List<String> fileData, String filePath) throws URISyntaxException, IOException;

}
