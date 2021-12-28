package com.mamun.service.implementation;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mamun.service.DataService;
import com.opencsv.CSVWriter;

@Service
public class DataServiceImplementation implements DataService {

	@Override
	public List<String> reduceFile(int nbrToTreat, List<String> file) {
		return file.stream().limit(nbrToTreat).collect(Collectors.toList());
	}

	@Override
	public List<String> inversFile(List<String> file) {
		Collections.reverse(file);
		return file;
	}

	@Override
	public List<String> fullJoin(List<String> firstFile, List<String> secondFile, int nbrToTreat) {

		// List size number for full join
		//
		//
		List<String> newList = new ArrayList<>();

		if (firstFile.size() == nbrToTreat && secondFile.size() == nbrToTreat) {
			for (int i = 0; i < nbrToTreat; i++) {
				// in order to have the second list in the first column
				newList.add(secondFile.get(i) + "," + firstFile.get(i));
			}
			return newList;
		}
		// case one the first one is shorter
		else if (firstFile.size() < nbrToTreat) {
			for (int i = 0; i < firstFile.size(); i++) {
				// in order to have the second list in the first column
				newList.add(secondFile.get(i) + "," + firstFile.get(i));
			}
			for (int i = firstFile.size(); i < secondFile.size(); i++) {
				newList.add(secondFile.get(i) + "," + "");
			}
			return newList;
		}
		// the second one is shorter
		else {
			for (int i = 0; i < secondFile.size(); i++) {
				newList.add(secondFile.get(i) + "," + firstFile.get(i));
			}
			for (int i = firstFile.size(); i < secondFile.size(); i++) {
				newList.add("" + "," + firstFile.get(i));
			}
			return newList;
		}
	}

	@Override
	public List<String> normalJoin(List<String> firstFile, List<String> secondFile) {
		List<String> newList = new ArrayList<>();

		if (firstFile.size() > secondFile.size() == true) {

			for (int i = 0; i < secondFile.size(); i++) {
				// have the second list in the first column
				//
				//
				newList.add(secondFile.get(i) + "," + firstFile.get(i));
			}
			return newList;
		} else if (firstFile.size() < secondFile.size() == true) {
			for (int i = 0; i < firstFile.size(); i++) {
				// in order to have the second list in the first column
				newList.add(secondFile.get(i) + "," + firstFile.get(i));
			}
			return newList;
		} else
			newList = this.fullJoin(firstFile, secondFile, firstFile.size());
		return newList;
	}

	@Override
	public List<String> flowNow(List<String> firstFile, List<String> secondFile, int nbrToTreat, String collationType) {

		// in this step the data prepare to the Collation
		secondFile = inversFile(reduceFile(nbrToTreat, secondFile));
		firstFile = reduceFile(nbrToTreat, firstFile);

		switch (collationType) {
		case "Normal":
			return normalJoin(firstFile, secondFile);
		case "Full":
			return fullJoin(firstFile, secondFile, nbrToTreat);
		// in this step we coverting compilation error
		default:
			return normalJoin(firstFile, secondFile);
		}

	}

	@Override
	public File createCsvfromData(List<String> fileData, String filePath) throws IOException {

		File file = new File("filedir/DataflowResultFor" + filePath + ".csv");
		try {
			// create FileWriter object with file as parameter
			FileWriter outputfile = new FileWriter(file);

			// create CSVWriter
			CSVWriter writer = new CSVWriter(outputfile);

			// adding header to CSV
			String[] header = { fileData.get(0) };
			writer.writeNext(header);

			for (int i = 1; i < fileData.size(); i++) {
				// add data to CSV
				String[] data = { fileData.get(i) };
				writer.writeNext(data);
			}

			// closing writer connection
			writer.close();
			// create the actual file
			file.createNewFile();
		} catch (IOException e) {

			e.printStackTrace();
		}

		return file;
	}

}
