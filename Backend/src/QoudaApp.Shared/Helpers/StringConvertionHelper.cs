using System.Text;

namespace QoudaApp.Shared.Helpers;

public static class StringConvertionHelper
{
    public static string ConvertToSnakeCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;
        var sb = new StringBuilder();
        sb.Append(char.ToLower(input[0]));
        for (var i = 1; i < input.Length; i++)
        {
            if (char.IsUpper(input[i]))
            {
                sb.Append('_');
                sb.Append(char.ToLower(input[i]));
            }
            else
            {
                sb.Append(input[i]);
            }
        }
        return sb.ToString();
    }
}
