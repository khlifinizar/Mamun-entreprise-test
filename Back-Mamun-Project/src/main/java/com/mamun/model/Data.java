package com.mamun.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Data {
	@JsonProperty("collationtype")
	private String collationType;

	@JsonProperty("numberlines")
	private int numberLines;

	@JsonProperty("download")
	private Boolean download;

	@JsonProperty("csv1")
	private List<String> firstFile;

	@JsonProperty("csv2")
	private List<String> secondFile;

	public Data() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Data(String collationType, int numberLines, Boolean download, List<String> firstFile,
			List<String> secondFile) {
		super();
		this.collationType = collationType;
		this.numberLines = numberLines;
		this.download = download;
		this.firstFile = firstFile;
		this.secondFile = secondFile;
	}

	public String getCollationType() {
		return collationType;
	}

	public void setCollationType(String collationType) {
		this.collationType = collationType;
	}

	public int getNumberLines() {
		return numberLines;
	}

	public void setNumberLines(int numberLines) {
		this.numberLines = numberLines;
	}

	public Boolean getDownload() {
		return download;
	}

	public void setDownload(Boolean download) {
		this.download = download;
	}

	public List<String> getFirstFile() {
		return firstFile;
	}

	public void setFirstFile(List<String> firstFile) {
		this.firstFile = firstFile;
	}

	public List<String> getSecondFile() {
		return secondFile;
	}

	public void setSecondFile(List<String> secondFile) {
		this.secondFile = secondFile;
	}

	
}
