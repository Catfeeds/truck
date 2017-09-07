package com.hyhl.gotosea.core.common.oss;

import java.util.Objects;

public enum PictureEnum {

	JPG(".jpg"),PNG(".png"),GIF(".gif"),JPEG(".jpeg"),BMP(".bmp");

	private String type;

	PictureEnum(String type){
		this.type = type;
	}
	
	
	public String type(){
		return this.type;
	}

	public static boolean allowdIf(String suffix){
		for (PictureEnum pictureEnum:PictureEnum.values()){
			if (Objects.equals(suffix,pictureEnum.type())) return true;
		}
		return false;
	}
}
