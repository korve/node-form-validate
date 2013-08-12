/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 14:25
 */

module.exports = {

	/**
	 * Merges source's properties into destination object
	 * @param source
	 * @param destination
	 * @returns {*}
	 */
	extend: function(source, destination)
	{
		if(typeof source !== 'object' || typeof destination != 'object')
		{
			return destination;
		}
		
		for(var prop in source)
		{
			/**
			 * Check if property exists in destination and if it is a object.
			 * If this is true, merge the properties of the underlying object
			 * recursively.
			 */
			if(prop in destination && typeof destination[prop] === 'object')			
			{
				var submerged = this.extend(source[prop], destination[prop]);
				destination[prop] = submerged;
			}
			else
			{
				destination[prop] = source[prop];
			}
		}
		
		return destination;
	}
	
};