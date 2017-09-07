package com.hyhl.gotosea.core.util;

/**
 * @author guan.sj
 * 
 */
public class UUIDMaker {
 
	private final static String str = "1234567890abcdefghijklmnopqrstuvwxyz";
 
	private final static int pixLen = str.length();
 
	private static volatile int pixOne = 0;
 
	private static volatile int pixTwo = 0;
 
	private static volatile int pixThree = 0;
 
	private static volatile int pixFour = 0;
 
	final public synchronized static String generate() {
 
		String hexString = Long.toHexString(System.currentTimeMillis());
 
		pixFour++;
 
		if (pixFour == pixLen) {
 
			pixFour = 0;
 
			pixThree++;
 
			if (pixThree == pixLen) {
 
				pixThree = 0;
 
				pixTwo++;
 
				if (pixTwo == pixLen) {
 
					pixTwo = 0;
 
					pixOne++;
 
					if (pixOne == pixLen) {
 
						pixOne = 0;
					}
 
				}
 
			}
 
		}
		return hexString + str.charAt(pixOne) + str.charAt(pixTwo)
				+ str.charAt(pixThree) + str.charAt(pixFour);
	}
 
}